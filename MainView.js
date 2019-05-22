const Observable = require('FuseJS/Observable');
var Model = require("UserData");
var Share = require("FuseJS/Share");
var Timer = require("FuseJS/Timer");
var Model = require("UserData");
var LocalNotify = require("LocalNotify");

var motivationUpdateTimer = null;

LocalNotify.on("receivedMessage", function(payload, fromNotifBar) {
    if ( fromNotifBar == true ) {
        router.push("navFrontPage");
        router.push("navNotificationArchivePage");
    }
});

function postProcessMotivationalMessages(responseObj) {
    var final_response = [];
    for ( i=0 ; i < responseObj.length; i++ ) {
        var temp_object = {};
        temp_object['title'] = responseObj[i].title;
        temp_object['message'] = responseObj[i].message;
        final_response[i] = temp_object;
    }
    return final_response;
}

function getMotivationUpdates() {

    var status = 0;
    var response_ok = false;

    fetch('http://citengam.com/slutta-messages.json', {
        method: 'GET'
    }).then(function(response) {
        status = response.status;  // Get the HTTP status code
        response_ok = response.ok; // Is response.status in the 200-range?
        return response.json();    // This returns a promise
    }).then(function(responseObject) {
        // Do something with the result
        var userData = Model.getUserData();
        userData["dailyNotifications"].value = postProcessMotivationalMessages(responseObject);
    }).catch(function(err) {
        // An error occurred somewhere in the Promise chain
    });
    if (motivationUpdateTimer == null) {
        // motivationUpdateTimer = Timer.create(getMotivationUpdates, 10000, true);
    }
}
getMotivationUpdates();


module.exports = {
    getMotivationUpdates: getMotivationUpdates
};
