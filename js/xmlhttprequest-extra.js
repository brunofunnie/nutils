(function () {
    var nativeOpen = XMLHttpRequest.prototype.open;
    var callbacks = XMLHttpRequest.callbacks = [];
    XMLHttpRequest.prototype.open = function () {
        callbacks.forEach(callback => callback.apply(this, arguments));
        nativeOpen.apply(this, arguments);
    };
})();

function addXHROpenCallback(cb) {
    XMLHttpRequest.callbacks.push(cb);
}

addXHROpenCallback(function (method, url) {
    // console.log(`XHR opened. Method: ${method}, URL: ${url}`);
    this.addEventListener('load', function() {
        // console.log('request completed!');
        // console.log(this.readyState);
        // console.log(this.responseText);

        let json = JSON.parse(this.responseText)

        if (json) {
            if (json.bill) {
                console.log(json)
                mybills.push(json)
            }
        }
    });
});