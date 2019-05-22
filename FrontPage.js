const Observable = require('FuseJS/Observable');
var AppEvents = require("AppEvent");
var LocalNotify = require("LocalNotify");
var AdForm = require("AdForm");
var DateTimeHelpers = require("DateTimeHelpers");
var Model = require("UserData");
var Share = require("FuseJS/Share");
var Timer = require("FuseJS/Timer");
var UserTimeObservables = require("UserTimeObservables");

var activeTimers = Observable(false);
var showZeroDayPopup = Observable(false);
var zeroDayPopupMessage = Observable("");
var randomBg = Observable("Assets/bg_03.jpg");

var moneySavedTimer = null;

//--------

function activeCheck(args) {
	var latestUserData = Model.getUserData();
	var smokesActive = JSON.stringify(latestUserData.smokes.value);
	var snusActive = JSON.stringify(latestUserData.snus.value);

	if ( smokesActive == "true" || snusActive == "true") {
		activeTimers.value = true;
	} else {
		activeTimers.value = false;
	}
};

var cycleRandomBg = function() {
    var bgs = [
                "Assets/bg_02.jpg",
                "Assets/bg_03.jpg"
              ];
    randomBgNumber = Math.floor(Math.random() * bgs.length);
    randomBg.value = bgs[randomBgNumber];
}

Model.getUserData()["smokes"].onValueChanged(module, activeCheck);
Model.getUserData()["snus"].onValueChanged(module, activeCheck);

var shareWins = function() {
    depRouter.push("navSharePage", {});
}

var zeroDayPopupCheck = function() {
	var userData = Model.getUserData();

	if (!userData["mustShowZeroDayNotifSmoke"].value && !userData["mustShowZeroDayNotifSnus"].value) {
		return;
	}

	var smokeMsg = "Hei! Det at du har valgt å slutte å røyke, vil påvirke kroppen din og livet ditt positivt på flere måter enn du tror. Dette vil du få vite mer om i meldingene du mottar på din mobil fremover. Lykke til! Å slutte å røyke er det viktigste du gjør for helsen din.";
	var snusMsg = "Hei! Det at du har valgt å slutte å snuse vil påvirke kroppen din og livet ditt positivt på flere måter enn du tror. Dette vil vi fortelle deg litt om i meldingene du mottar på mobilen din i tiden fremover. Lykke til!"
	var snusAndSmokeMsg = "Hei! Det at du har valgt å slutte vil påvirke kroppen din og livet ditt positivt på flere måter enn du tror. Dette vil vi fortelle deg litt om i meldingene du mottar på mobilen din i tiden fremover. Lykke til!";

	if (userData["mustShowZeroDayNotifSmoke"].value && userData["mustShowZeroDayNotifSnus"].value) {
		showZeroDayPopup.value = true;
		zeroDayPopupMessage.value = snusAndSmokeMsg;
	} else if (userData["mustShowZeroDayNotifSmoke"].value) {
		showZeroDayPopup.value = true;
		zeroDayPopupMessage.value = smokeMsg;
	} else {
		showZeroDayPopup.value = true;
		zeroDayPopupMessage.value = snusMsg;
	}
	userData["mustShowZeroDayNotifSmoke"].value = false;
	userData["mustShowZeroDayNotifSnus"].value = false;
	Model.dispatchSaveUserData();
};

module.exports = {
    gotoSettings: function(args) {
        var data2 = {'id':0};
        depRouter.push("navSettingsPage", data2)
    },
    gotoMenu: function(args) {
        var data2 = {'id':0};
        depRouter.push("navMenuPage", data2)
    },
    gotoHealthEffects: function(args) {
        depRouter.push("navHealthEffectsPage", args.data);
		AppEvents.logEvent('helsegevinster_click');
    },
    gotoHelp: function(args) {
        depRouter.push("navHelpPage", args.data);
		AppEvents.logEvent('hjelp_click');
    },
	gotoSmokeDetails: function(args) {
		AppEvents.logEvent('smoking_details_click');
        if (UserTimeObservables.durationSmokeFreeMs.value > 0) {
            var data = {"isSmoke": true};
            depRouter.push("navDetailsPage", data)
        }
    },
	gotoSnusDetails: function(args) {
		AppEvents.logEvent('snus_details_click');
        if (UserTimeObservables.durationSnusFreeMs.value > 0) {
            var data = {"isSmoke": false};
            depRouter.push("navDetailsPage", data)
        }
    },
	shareWins: shareWins,
	activeTimers: activeTimers,
	activeCheck: activeCheck,
	zeroDayPopupCheck: zeroDayPopupCheck,
	showZeroDayPopup: showZeroDayPopup,
	zeroDayPopupMessage: zeroDayPopupMessage,
    randomBg: randomBg,
    cycleRandomBg: cycleRandomBg,
};
