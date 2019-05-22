var Model = require("UserData");
var AppEvents = require("AppEvent");
var DateTimeHelpers = require("DateTimeHelpers");
var Observable = require("FuseJS/Observable");
var DailyNotify = require("DailyNotifications.js");
const moment = require('ExtraJS/moment');

var reset = Observable();
var smokeStartDateOnPageOpen = 0;
var snusStartDateOnPageOpen = 0;

this.Parameter.onValueChanged(module, function(param) {
	reset.value = param.id;
});

function onActivated(args) {
	var userData = Model.getUserData();

	if (userData["smokes"]) {
		smokeStartDateOnPageOpen = userData["smokeFreeSince"].value.getTime();
	} else {
		smokeStartDateOnPageOpen = 0;
	}
	if (userData["snus"]) {
		snusStartDateOnPageOpen = userData["snusFreeSince"].value.getTime();
	} else {
		snusStartDateOnPageOpen = 0;
	}

    if (reset.value == 'reset') {
        Model.resetAndSaveUserData();
    }
};

// var maybeRenqueueNotifications = function() {
//     var userData = Model.getUserData();
//     if (userData["smokes"].value || userData["snus"].value) {
//         var smokeFreeDate = userData["smokeFreeSince"].value;
//         var snusFreeDate = userData["snusFreeSince"].value;
//         var notifs = userData["dailyNotifications"].value;
//         var from = new Date(Math.min(smokeFreeDate.valueOf(), snusFreeDate.valueOf()));
//         DailyNotify.renqueueNotifications(from, notifs);
//     } else {
//         DailyNotify.dequeueNotifications();
//     }
// };

var shouldSetZeroDayPopup = function(uses, since, openVal) {
	if (uses && (openVal !== since.getTime())) {
		var freeMoment = moment(since);
		freeMoment.hour(0);
		freeMoment.minute(0);
		freeMoment.second(0);
		freeMoment.millisecond(0);
		var today = moment({"hour": 0, "minute":0, "second":0, "millisecond":0});
		var res = (freeMoment.valueOf() == today.valueOf());
		return res;
	} else {
		return false;
	}
}

// saves user data with tick button and returns to prev page
function returnAndSave(args) {
	var userData = Model.getUserData();

	if (userData["smokes"] && userData["snus"]) {
		AppEvents.logEvent('royk_og_snus_lagret');
	} else if (userData["smokes"]) {
		AppEvents.logEvent('royk_lagret');
	} else if (userData["snus"]) {
		AppEvents.logEvent('snus_lagret');
	} else {
		AppEvents.logEvent('ingenting_lagret');
	}

	if (userData["allowCameraBackground"]) {
		AppEvents.logEvent('kamera_tillatt');
	}

	userData["mustShowZeroDayNotifSmoke"].value = shouldSetZeroDayPopup(userData["smokes"].value, userData["smokeFreeSince"].value, smokeStartDateOnPageOpen);
	userData["mustShowZeroDayNotifSnus"].value = shouldSetZeroDayPopup(userData["snus"].value, userData["snusFreeSince"].value, snusStartDateOnPageOpen);

    Model.dispatchSaveUserData();
    DailyNotify.forceUpdateEnqueuedLocalNotifications();
    Model.dispatchLoadUserData();
    if (reset.value == 'reset') {
        reset.value = '';
        depRouter.push("navFrontPage");
    } else {
        depRouter.goBack();
    }
}

var returnAndLoad = function() {
	DailyNotify.updateEnqueuedLocalNotifications();
    depRouter.goBack();
}


module.exports = {
    resetSmokeSince: Model.resetSmokeSince,
    resetSnusSince: Model.resetSnusSince,
    returnAndSave: returnAndSave,
    returnAndLoad: returnAndLoad,

    onActivated: onActivated,
	shouldSetZeroDayPopup: shouldSetZeroDayPopup,

    minDate: new Date(Date.parse("1950-01-01T00:00:00.000Z")),
    maxDate: new Date(Date.parse("2050-01-01T00:00:00.000Z")),

    userData: Model.getUserData()
};
