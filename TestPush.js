
// set up push notification backends
var Push = require("Firebase/Notifications");
var Environment = require('FuseJS/Environment');
var pushTopic = "na"
if(Environment.ios)     { pushTopic = "ios"; }
if(Environment.android) { pushTopic = "android"; }

// set up everything else
var Observable = require("FuseJS/Observable");
var Model = require("UserData");

var status = Observable("-");
var message = Observable("-no message yet-");


// push fns
Push.onRegistrationSucceeded = function(regID) {
    status.value = "onRegistrationSucceeded: " + regID;
    Push.subscribeToTopic(pushTopic);
};

Push.onRegistrationFailed = function(reason) {
};

Push.onReceivedMessage = function(payload, fromNotificationBar) {
    message.value = payload;
};

var clearBadgeNumber = function() {
    Push.clearBadgeNumber();
}

var clearAllNotifications = function() {
    Push.clearAllNotifications();
}

module.exports = {
    clearBadgeNumber: clearBadgeNumber,
    clearAllNotifications: clearAllNotifications,
    message: message,
    status: status,
    userData: Model.getUserData()
};
