var Model = require("UserData.js");
var AppEvents = require("AppEvent");
var DateTimeHelpers = require("DateTimeHelpers.js");
var Observable = require("FuseJS/Observable");
var DailyNotify = require("DailyNotifications.js");
var moment = require('ExtraJS/moment');

// duplicated because requiring SettingsPage.js broke
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
function returnAndSave() {
	var userData = Model.getUserData();

	userData["mustShowZeroDayNotifSmoke"].value = shouldSetZeroDayPopup(userData["smokes"].value, userData["smokeFreeSince"].value, 0);
	userData["mustShowZeroDayNotifSnus"].value = shouldSetZeroDayPopup(userData["snus"].value, userData["snusFreeSince"].value, 0);

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

    Model.dispatchSaveUserData();
    DailyNotify.updateEnqueuedLocalNotifications();
    depRouter.push("navFrontPage");
}

// EXPORTS
module.exports = {
    resetSmokeSince: Model.resetSmokeSince,
    resetSnusSince: Model.resetSnusSince,

    returnAndSave: returnAndSave,

    minDate: new Date(Date.parse("1950-01-01T00:00:00.000Z")),
    maxDate: new Date(Date.parse("2050-01-01T00:00:00.000Z")),

    userData: Model.getUserData(),

    gotoPage1: function() {
        router.goto("page1");
    },
    gotoPage2: function() {
        if ( Model.getUserData()["smokes"].value == true ) {
            // make button red
            router.goto("page2");
        } else if ( Model.getUserData()["snus"].value == true ) {
            // make button red
            router.goto("page3");
        } else {
            // do nothing - you have to choose one
        }
    },
    gotoPage3: function() {
        if ( Model.getUserData()["snus"].value == true ) {
            router.goto("page3");
        } else {
            router.goto("page4");
        }
    },
    gotoPage4: function() { router.goto("page4"); },
    gotoFrontPage: function(args) {
        depRouter.push("navFrontPage")
    }
};
