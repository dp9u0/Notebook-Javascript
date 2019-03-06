const promiseFinally = require('./finally');

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;
const ADOPTED = 3;

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function () {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise)) {
    throw new TypeError('Promises must be constructed via new Promise()');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }
  /** @type {!number} */
  this._state = PENDING;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];
  _doResolve(fn, this);
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 * Makes no guarantees about asynchrony.
 */
function _doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function (value) {
        if (done) return;
        done = true;
        _resolve(self, value);
      },
      function (reason) {
        if (done) return;
        done = true;
        _reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    _reject(self, ex);
  }
}

/**
 * 
 * @param {Promise} self 
 * @param {*} newValue 
 */
function _resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = ADOPTED;
        self._value = newValue;
        _finale(self);
        return;
      } else if (typeof then === 'function') {
        _doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = FULFILLED;
    self._value = newValue;
    _finale(self);
  } catch (e) {
    _reject(self, e);
  }
}

/**
 * _reject
 * @param {*} self 
 * @param {*} newValue 
 */
function _reject(self, newValue) {
  self._state = REJECTED;
  self._value = newValue;
  _finale(self);
}

function _finale(self) {
  if (self._state === REJECTED && self._deferreds.length === 0) {
    Promise._immediateFn(function () {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }
  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    _handle(self, self._deferreds[i]);
  }
  self._deferreds = [];
}

function _handle(self, deferred) {
  while (self._state === ADOPTED) {
    self = self._value;
  }
  if (self._state === PENDING) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function () {
    var cb = self._state === FULFILLED ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === FULFILLED ? _resolve : _reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      _reject(deferred.promise, e);
      return;
    }
    _resolve(deferred.promise, ret);
  });
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

// BEGIN: Prototype Methods

/**
 * Calls onFulfilled or onRejected with the fulfillment value or 
 * rejection reason of the promise (as appropriate) and returns a new promise resolving 
 * to the return value of the called handler.
 * If the handler throws an error, the returned Promise will be rejected with that error.
 * If the onFulfilled handler is not a function, it defaults to the identify function 
 * (i.e. function (value) { return value; }).
 * If the onRejected handler is not a function, it defaults to a function that always throws 
 * (i.e. function (reason) { throw reason; }).
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
  // @ts-ignore
  var promise = new this.constructor(noop);
  _handle(this, new Handler(onFulfilled, onRejected, promise));
  return promise;
};

/*
getUser().then((user)=>{

}).catch((error)=>{

})
*/
/**
 * Equivalent to calling Promise.prototype.then(undefined, onRejected)
 */
Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};

/**
 * Some promise libraries implement a (non-standard) .finally method. It takes a function,
 * which it calls whenever the promise is fulfilled or rejected. It can be pollyfilled with: 
 */
// @non-standard
Promise.prototype['finally'] = promiseFinally;

// BEGIN: Methods

/**
 * Returns a promise that is resolved with the given value.
 */
Promise.resolve = function (value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }
  return new Promise(function (resolve) {
    resolve(value);
  });
};

/**
 * Returns a promise that is rejected with the given reason.
 */
Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

/**
 * Returns a Promise that waits for all promises in the iterable to be fulfilled 
 * and is then fulfilled with an array of those resulting values (in the same order as the input).
 */
Promise.all = function (arr) {
  return new Promise(function (resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function (val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};


/**
 * Returns a promise that resolves or rejects as soon as any of the promises in iterable have been resolved or rejected (with the corresponding reason or value).
 */
Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// BEGIN: Custom Api
/**
 * By default promise-polyfill uses setImmediate, but falls back to setTimeout for executing asynchronously. 
 * If a browser does not support setImmediate (IE/Edge are the only browsers with setImmediate), 
 * you may see performance issues. Use a setImmediate polyfill to fix this issue. setAsap or setImmediate work well.
 * If you polyfill window.setImmediate or use Promise._immediateFn = yourImmediateFn 
 * it will be used instead of window.setTimeout
 */
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function (fn) {
      setImmediate(fn);
    }) ||
  function (fn) {
    setTimeoutFunc(fn, 0);
  };

/**
 * It will show a warning if a Promise is already rejected but no .catch has been called(may be called later). 
 * You can change this behavior by doing.
 */
Promise._unhandledRejectionFn = function (err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;