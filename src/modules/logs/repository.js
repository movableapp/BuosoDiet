
var logs = [];

exports.add = function(logModel) {
    logs.push(logModel);
};

exports.getLogs = function() {
    return logs;
};

exports.reset = function() {
    logs = [];
};

exports.serialize = function() {
    var data = [];
    logs.forEach(function(log) {
        data.push(log.getData());
    });
    return data;
};
