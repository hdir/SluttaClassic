const Observable = require("FuseJS/Observable");
const Model = require('UserData');
const LocalNotify = require("LocalNotify");
const DailyNotificationMessages = require("DailyNotificationMessages.js");
const DateTimeHelpers = require("DateTimeHelpers");
const moment = require('ExtraJS/moment');

const maxNotifCount = 48;
const twoDays = moment.duration({days:2});
const lastEnqueue = new Observable(moment(0));


const timeSinceLastUpdateEnqueue = function() {
    return moment.duration(moment() - lastEnqueue.value);
}

const updateEnqueuedLocalNotifications = function() {
    if (timeSinceLastUpdateEnqueue() < twoDays) return;
    forceUpdateEnqueuedLocalNotifications();
};

var weekdaysFree = function(since) {
    var midnightStartDay = moment(since);
    midnightStartDay.hour(0);
    midnightStartDay.minute(0);
    midnightStartDay.second(0);
    midnightStartDay.millisecond(0);
    var now = moment();
    return now.diff(midnightStartDay, 'days');
};

const forceUpdateEnqueuedLocalNotifications = function() {
    LocalNotify.cancelPendingNotifications();

    var userData = Model.getUserData();

    var smokes = userData["smokes"].value;
    var snus = userData["snus"].value;

    var smokeDay = 999;
    var snusDay = 999;

    var quitSmokeReason = undefined;
    var quitSnusReason = undefined;

    if (smokes) {
        smokeDay = weekdaysFree(Model.getUserData()["smokeFreeSince"].value);
        quitSmokeReason = userData["quitSmokingReason"].value["NameEn"];
    }
    if (snus) {
        snusDay = weekdaysFree(Model.getUserData()["snusFreeSince"].value);
        quitSnusReason = userData["quitSnusReason"].value["NameEn"];
    }

    var listOfListsOfNotifications = getNotificationsAfterGivenDay(smokeDay,
                                                                   snusDay,
                                                                   DailyNotificationMessages.localNotifsSmoke,
                                                                   DailyNotificationMessages.localNotifsSnus,
                                                                   quitSmokeReason,
                                                                   quitSnusReason);
    enqueue(listOfListsOfNotifications, maxNotifCount);

    lastEnqueue.value = moment();
};


const enqueue = function(daysNotifs, maxCount) {
    //                number of days from today
    //                |
    //                v
    // daysNotifs = [[0, ..notifObj0.., ..notifObj1.., etc],
    //               [1, ..notifObj0.., ..notifObj1.., etc],
    //               [2, ..notifObj0.., ..notifObj1.., etc],
    //               etc]
    //
    var midnightAmToday = moment({hour:0, minute:0, second:0, millisecond:0});
    var totalCount = 0;
    daysNotifs.forEach(function(dayNotifs) {
        if (totalCount >= maxCount) return;
        var relDayNum = dayNotifs[0];

        var dayMessageObjs = dayNotifs.slice(1);
        var dayMessageCount = dayMessageObjs.length;

        var midnightAmNotifDay = moment(midnightAmToday + moment.duration({days:relDayNum}));

        dayMessageObjs.forEach(function(notif, i) {
            if (totalCount >= maxCount) return;
            var message = notif["msg"];
            var notifMoment = moment(midnightAmNotifDay + notif["time"]);
            var secondsFromNow = ((notifMoment - moment()) / 1000);
            if (secondsFromNow>0) {
                LocalNotify.later(secondsFromNow, "Slutta", message, "", true, 0, {
                   "id": "com.slutta.notifs.daily",
                   "channelName": "General Notifications",
                   "description": "A description of the channel"
               });
                totalCount += 1;
            }
        });
    });
}

const getNotificationsAfterGivenDay = function(startDayA, startDayB, notifsA, notifsB, reasonA, reasonB) {
    var results = [];
    var relativeDayFromNow = 0;
    var dayA = startDayA;
    var dayB = startDayB;
    while (dayA <= 365 || dayB <= 365) {

        var potentialsA = (notifsA[dayA] === undefined) ? {} : notifsA[dayA];
        var potentialsB = (notifsB[dayB] === undefined) ? {} : notifsB[dayB];

        var mandatoryA = (potentialsA["MANDATORY"] === undefined) ? [] : potentialsA["MANDATORY"];
        var mandatoryB = (potentialsB["MANDATORY"] === undefined) ? [] : potentialsB["MANDATORY"];

        var reasonedA = (potentialsA[reasonA] === undefined) ? [] : potentialsA[reasonA];
        var reasonedB = (potentialsB[reasonB] === undefined) ? [] : potentialsB[reasonB];

        var dayNotifsA = interleaveArrays(mandatoryA, reasonedA);
        var dayNotifsB = interleaveArrays(mandatoryB, reasonedB);

        var taggedNotifsA = dayNotifsA.map(function(val, i) {
            var resA = {};
            resA["tag"] = "A";
            resA["msg"] = val;
            resA["zero"] = (dayA===0 && i===0);
            return resA;
        });

        var taggedNotifsB = dayNotifsB.map(function(val, i) {
            var resB = {};
            resB["tag"] = "B";
            resB["msg"] = val;
            resB["zero"] = (dayB===0 && i===0);
            return resB;
        });

        var daysNotifs = interleaveArrays(taggedNotifsA, taggedNotifsB);

        var notifTime = moment.duration({hours:9});
        var timeStep = moment.duration(0);
        if (daysNotifs.length > 0) {
            timeStep = moment.duration({hours:(12 / (daysNotifs.length-1))});
        }

        var daysNotifsWithTime = daysNotifs.map(function(val) {
            val["time"] = moment.duration(notifTime);
            notifTime.add(timeStep);
            return val;
        });

        if (daysNotifsWithTime.length > 0)
        {
            daysNotifsWithTime.unshift(relativeDayFromNow);
            results.push(daysNotifsWithTime);
        }
        relativeDayFromNow += 1;
        dayA += 1;
        dayB += 1;
    }
    return results;
}

const interleaveArrays = function(A, B) {
    var interleaved = [];
    var aLen = A.length;
    var bLen = B.length;
    var minLen = Math.min(aLen, bLen);
    var maxLen = Math.max(aLen, bLen);
    var longer = (aLen>bLen) ? A : B;
    for (i = 0; i < minLen; i++) {
        interleaved.push(A[i], B[i]);
    }
    for (i = minLen; i < maxLen; i++) {
        interleaved.push(longer[i]);
    }
    return interleaved;
}

var pastSmokeNotifs = Observable();
var pastSnusNotifs = Observable();

var updatePastNotifs = function() {

    var userData = Model.getUserData();
    var smokes = userData["smokes"].value;
    var snus = userData["snus"].value;

    var quitSmokeReason = undefined;
    var quitSnusReason = undefined;

    var smokeFreeSince = moment(Model.getUserData()["smokeFreeSince"].value);
    var snusFreeSince = moment(Model.getUserData()["snusFreeSince"].value);

    var smokeCurrentTimelineMoment = moment();
    var snusCurrentTimelineMoment = moment();

    var smokeNotifs = [];
    var snusNotifs = [];

    var smokeDay = 999;
    var snusDay = 999;

    if (smokes) {
        smokeMidnightAmStartDateTime = moment(smokeFreeSince);
        smokeMidnightAmStartDateTime.hour(0);
        smokeMidnightAmStartDateTime.minute(0);
        smokeMidnightAmStartDateTime.second(0);
        smokeMidnightAmStartDateTime.millisecond(0);
        quitSmokeReason = userData["quitSmokingReason"].value["NameEn"];
        smokeDay = 0;
    }
    if (snus) {
        snusMidnightAmStartDateTime = moment(snusFreeSince);
        snusMidnightAmStartDateTime.hour(0);
        snusMidnightAmStartDateTime.minute(0);
        snusMidnightAmStartDateTime.second(0);
        snusMidnightAmStartDateTime.millisecond(0);
        quitSnusReason = userData["quitSnusReason"].value["NameEn"];
        snusDay = 0;
    }
    if (smokes && snus) {
        smokeDay = weekdaysFree(Model.getUserData()["smokeFreeSince"].value);
        snusDay = weekdaysFree(Model.getUserData()["snusFreeSince"].value);
        var startMax = Math.max(smokeDay, snusDay);
        smokeDay -= startMax;
        snusDay -= startMax;
    }

    var listOfListsOfNotifications = getNotificationsAfterGivenDay(
        smokeDay,
        snusDay,
        DailyNotificationMessages.localNotifsSmoke,
        DailyNotificationMessages.localNotifsSnus,
        quitSmokeReason,
        quitSnusReason);

    //                                number of days from today
    //                                |
    //                                v
    // listOfListsOfNotifications = [[0, ..notifObj0.., ..notifObj1.., etc],
    //                               [1, ..notifObj0.., ..notifObj1.., etc],
    //                               [2, ..notifObj0.., ..notifObj1.., etc],
    //                               etc]
    //

    var oneDay = moment.duration({days:1});
    var now = moment();
    listOfListsOfNotifications.forEach(function(dayNotifs) {
        var smokeDayNotifs = [];
        var snusDayNotifs = [];
        var relDayNum = dayNotifs[0];
        dayNotifs.slice(1).forEach(function(notif) {
            if (notif["tag"]=="A") {
                var dayNumA = smokeDay + relDayNum;
                var notifTimeA = moment(smokeMidnightAmStartDateTime).add(moment.duration({days:dayNumA})).add(notif["time"]);
                var msgInPastA = (notifTimeA < now);
                var afterStartA = (notifTimeA > smokeFreeSince);
                if ((notif["zero"] && dayNumA === 0 && smokeMidnightAmStartDateTime < now) || (msgInPastA && afterStartA)) {
                    smokeDayNotifs.push({"nMessage": notif["msg"]});
                }
            } else if (notif["tag"]=="B") {
                var dayNumB = snusDay + relDayNum;
                var notifTimeB = moment(snusMidnightAmStartDateTime).add(moment.duration({days:dayNumB})).add(notif["time"]);
                var msgInPastB = (notifTimeB < now);
                var afterStartB = (notifTimeB > snusFreeSince);
                if ((notif["zero"] && dayNumB === 0 && snusMidnightAmStartDateTime < now) || (msgInPastB && afterStartB)) {
                    snusDayNotifs.push({"nMessage": notif["msg"]});
                }
            }
        });
        if (smokeDayNotifs.length>0) {
            smokeDayNotifs.reverse();
            var dayA = {
                "day": smokeDayNotifs,
                "num": smokeDay + relDayNum
            };
            smokeNotifs.push(dayA);
        }
        if (snusDayNotifs.length>0) {
            snusDayNotifs.reverse();
            var dayB = {
                "day": snusDayNotifs,
                "num": snusDay + relDayNum
            };
            snusNotifs.push(dayB);
        }
    });

    smokeNotifs.reverse();
    snusNotifs.reverse();
    pastSmokeNotifs.value = smokeNotifs;
    pastSnusNotifs.value = snusNotifs;
};


var pastSmokeNotifications = function() {
    var userData = Model.getUserData();
    if (userData["smokes"].value)
    {
        updatePastNotifs();
        return pastSmokeNotifs.value;
    }
    else
    {
        return [];
    }
}

var pastSnusNotifications = function() {
    var userData = Model.getUserData();
    if (userData["snus"].value)
    {
        updatePastNotifs();
        return pastSnusNotifs.value;
    }
    else
    {
        return [];
    }
};

module.exports = {
    updateEnqueuedLocalNotifications: updateEnqueuedLocalNotifications,
    forceUpdateEnqueuedLocalNotifications: forceUpdateEnqueuedLocalNotifications,
    pastSmokeNotifications: pastSmokeNotifications,
    pastSnusNotifications: pastSnusNotifications
};
