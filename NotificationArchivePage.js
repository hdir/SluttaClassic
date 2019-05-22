const Observable = require('FuseJS/Observable');
var DailyNotifications = require("DailyNotifications");
var Model = require('UserData');
var UserTimeObservables = require("UserTimeObservables.js");

var passedSmokeNotifs = Observable();
var passedSnusNotifs = Observable();
var showSmoke = Observable();
var showSnus = Observable();

const onActivated = function() {
    passedSmokeNotifs.replaceAll(DailyNotifications.pastSmokeNotifications());
    passedSnusNotifs.replaceAll(DailyNotifications.pastSnusNotifications());
    showSmoke.value = (Model.getUserData()["smokes"].value && UserTimeObservables.durationSmokeFreeMs.value > 0);
    showSnus.value = (Model.getUserData()["snus"].value && UserTimeObservables.durationSnusFreeMs.value > 0);
};

const currentPage = Observable();

const smokeTapped = function() {
    currentPage.value = "archiveTabRoyk";
};

const snusTapped = function() {
    currentPage.value = "archiveTabSnus";
};

module.exports = {
    currentPage: currentPage,
    passedSmokeNotifs: passedSmokeNotifs,
    passedSnusNotifs: passedSnusNotifs,
    onActivated: onActivated,
    smokeTapped: smokeTapped,
    snusTapped: snusTapped,
    showSmoke: showSmoke,
    showSnus: showSnus
};
