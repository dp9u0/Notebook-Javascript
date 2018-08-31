try {
    function e() {
        console.log(this);
    }
    throw e;
} catch (e) {
    e();
    // ref(e) = {
    //     base: global,
    //     propertyName: 'e'
    // }
}