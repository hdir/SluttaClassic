const Observable = require('FuseJS/Observable');
var Model = require("UserData");

function homePageTimeout() {
	var latestUserData = Model.getUserData();
	var smokesActive = latestUserData.smokes.value;
	var snusActive = latestUserData.snus.value;
	if (smokesActive || snusActive) {
        depRouter.push("navFrontPage");
	} else {
        depRouter.push("navOnboardingPage");
	}
}

module.exports = {
    homePageTimeout: homePageTimeout
};
