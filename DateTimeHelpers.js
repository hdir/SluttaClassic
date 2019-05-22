const Observable = require('FuseJS/Observable');
const moment = require('ExtraJS/moment');

//--------

var datePretty = function(ms_or_date) {
    var m = moment(ms_or_date);
    return m.format("DD/MM/YYYY")
}

//--------

var msInDays = function(ms) {
    return ms / (24 * 60 * 60 * 1000);
};

var msInHours = function(ms) {
    return ms / (60 * 60 * 1000);
};

var msInMins = function(ms) {
    return ms / (60 * 1000);
};

var daysSince = function(date) {
    return (moment() - moment(date)).days();
}

//--------

module.exports = {
    msInDays: msInDays,
    msInHours: msInHours,
    msInMins: msInMins,
    daysSince: daysSince,
    datePretty: datePretty,
}
