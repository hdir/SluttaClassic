var Model = require("UserData");
var Observable = require("FuseJS/Observable");
var AppEvents = require("AppEvent");
// var DailyNotify = require("DailyNotify");

var isSmokingActive = Observable();

var returnToMain = function() {
    depRouter.goBack();
}

function checkIsSmokingActive(args) {
    if ( Model.getUserData()["smokes"].value == true ) {
        isSmokingActive.value = true;
    } else {
        isSmokingActive.value = false;
    }
}

module.exports = {
    returnToMain: returnToMain,
    gotoSettings: function(args) {
        var data2 = {'id':0};
        depRouter.push("navSettingsPage", data2)
    },
    gotoPushNotifications: function() {
        AppEvents.logEvent('pushnotifications_click');
        depRouter.push("navNotificationArchivePage")
    },
    isSmokingActive: isSmokingActive,
    checkIsSmokingActive: checkIsSmokingActive,
    gotoAvhengighetstest: function() {
        AppEvents.logEvent('avhengighetstest_click');
    },
    gotoRoykesluttgevinster: function() {
        AppEvents.logEvent('roykesluttgevinster_click');
    }
};
