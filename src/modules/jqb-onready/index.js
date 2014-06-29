
function addCallback(callback) {
    if (this.onReadyFlag) {
        callback();
    } else {
        this.onReadyCallbacks.push(callback);
    }
}

function runCallback(callback) {
    callback();
}

function ready() {
    this.onReadyFlag = true;
    this.onReadyCallbacks.forEach(runCallback);
    this.onReadyCallbacks = [];
}

function reset() {
    this.onReadyCallbacks = [];
    this.onReadyFlag = false;
}

function onReady(data) {
    if (data === true) {
        ready.call(this);
    } else if (data === false) {
        reset.call(this);
    } else {
        addCallback.call(this, data);
    }
}

exports.mixin = function(obj) {
    obj = obj || {};
    obj.onReadyCallbacks = [];
    obj.onReadyFlag = false;
    obj.onReady = onReady;
    return obj;
};
