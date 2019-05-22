var FBAnalytics = require("Firebase/Analytics");
var FirebaseAnalytics = require('android_const.js');


module.exports = {
	logEvent: function(name) {
        var eventName = "slutta_" + name;
		var p = {};
		p[FirebaseAnalytics.Param.CONTENT_TYPE] = "slutta_click";
		p[FirebaseAnalytics.Param.ITEM_ID] = 1;
		FBAnalytics.logEvent(eventName, p);
	}
};
