const Observable = require('FuseJS/Observable');
const moment = require('ExtraJS/moment');
const Model = require('UserData');
const DateTimeHelpers = require("DateTimeHelpers");

const durationSmokeFreeMs = Observable(0);
const durationSnusFreeMs = Observable(0);
const durationSmokeFreeDays = Observable(0);
const durationSmokeFreeHours = Observable(0);
const durationSmokeFreeMins = Observable(0);
const durationSnusFreeDays = Observable(0);
const durationSnusFreeHours = Observable(0);
const durationSnusFreeMins = Observable(0);
const numberOfCigs = Observable(0);
const numberOfSnus = Observable(0);
const cigSaved = Observable(0);
const snusSaved = Observable(0);
const tarInMg = Observable(0);
const nicotineInMg = Observable(0);
const ammoniaInMg = Observable(0);
const moneySaved = Observable(0);
const moneySavedPretty = Observable(0);

var calcNumberOfUnits = function(unitsDaily, durationFreeDays) {
    return Math.floor(durationFreeDays * unitsDaily);
}

var calcMoneySaved = function(pricePerUnit, unitsDaily, durationFreeDays, enabled) {
    if (!enabled) return 0;
    var units = calcNumberOfUnits(unitsDaily, durationFreeDays);
    if (typeof pricePerUnit == 'string') {
        pricePerUnit = pricePerUnit.replace(/,/, '.');
    }
    var pricePerUnitAsFloat = parseFloat(pricePerUnit);
    return Math.max(0, units * pricePerUnitAsFloat);
};

const updateTimer = function() {
    var val = moment();

    var cigsDaily = Model.getUserData()["dailyCigarettes"].value.NameEn;
    var snusDaily = Model.getUserData()["dailySnus"].value.NameEn;

    durationSmokeFreeMs.value = val.valueOf() - Model.getUserData()["smokeFreeSince"].value.getTime();
    durationSnusFreeMs.value = val.valueOf() - Model.getUserData()["snusFreeSince"].value.getTime();

    durationSmokeFreeDays.value = DateTimeHelpers.msInDays(durationSmokeFreeMs.value);
    durationSnusFreeDays.value = DateTimeHelpers.msInDays(durationSnusFreeMs.value);

    durationSmokeFreeHours.value = DateTimeHelpers.msInHours(durationSmokeFreeMs.value);
    durationSnusFreeHours.value = DateTimeHelpers.msInHours(durationSnusFreeMs.value);

    durationSmokeFreeMins.value = DateTimeHelpers.msInMins(durationSmokeFreeMs.value);
    durationSnusFreeMins.value = DateTimeHelpers.msInMins(durationSnusFreeMs.value);

    numberOfCigs.value = calcNumberOfUnits(cigsDaily, durationSmokeFreeDays.value);
    numberOfSnus.value = calcNumberOfUnits(snusDaily, durationSnusFreeDays.value);

    tarInMg.value = numberOfCigs.value * 8;
    nicotineInMg.value = numberOfCigs.value;
    ammoniaInMg.value = (numberOfCigs.value * 0.7948).toFixed(0);

    cigSaved.value = calcMoneySaved(Model.getUserData()["pricePerCigarette"].value.NameEn,
                                    cigsDaily,
                                    durationSmokeFreeDays.value,
                                    Model.getUserData()["smokes"].value);

    snusSaved.value = calcMoneySaved(Model.getUserData()["pricePerSnus"].value.NameEn,
                                     snusDaily,
                                     durationSnusFreeDays.value,
                                     Model.getUserData()["snus"].value);

    var moneySavedRaw = cigSaved.value + snusSaved.value;
    var moneySaved2dp = Math.round((moneySavedRaw + 0.00001) * 100) / 100;
    moneySaved.value = moneySaved2dp;

    var moneyPretty = moneySaved.value;
    var moneyPrettyString = moneyPretty.toString();
    var hasDecimalPlace = true;
    if (moneyPrettyString.indexOf('.') > -1) {
        moneyPrettyString = moneyPrettyString.replace('.', ',');
        var moneyPretty_split = moneyPrettyString.split(",");
        if (moneyPretty_split[0].length > 3 ) {
            var firstSplit = moneyPretty_split[0].substr(moneyPretty_split[0].length - 3);
            var secondSplit = moneyPretty_split[0].substr(0, moneyPretty_split[0].length - 3);
            moneyPretty_split[0] = secondSplit + ' ' + firstSplit;
            var secondSplit = moneyPretty_split[0].substr(0, moneyPretty_split[0].length - 3);
        }
        // add extra 0 if has decimals, do nothing if no decimals
        if (hasDecimalPlace == true && moneyPretty_split[1].length == 1) {
            moneyPretty_split[1] = moneyPretty_split[1] + '0';
        }
        var moneyPretty_final = moneyPretty_split[0] + ',' + moneyPretty_split[1];
    } else {
        hasDecimalPlace = false;
        var moneyPretty_final = moneyPrettyString;
    }



    moneySavedPretty.value = moneyPretty_final;

	setTimeout(updateTimer, 1000);
};

const startTimeSource = function() {
    updateTimer();
};

startTimeSource();

var smokeFreeSincePretty = Model.getUserData()["smokeFreeSince"].map(function(val) {
    return DateTimeHelpers.datePretty(val);
});

var snusFreeSincePretty = Model.getUserData()["snusFreeSince"].map(function(val) {
    return DateTimeHelpers.datePretty(val);
});

module.exports = {
    durationSmokeFreeMs: durationSmokeFreeMs,
    durationSnusFreeMs: durationSnusFreeMs,
    durationSmokeFreeDays: durationSmokeFreeDays,
    durationSnusFreeDays: durationSnusFreeDays,
    durationSmokeFreeHours: durationSmokeFreeHours,
    durationSnusFreeHours: durationSnusFreeHours,
    durationSmokeFreeMins: durationSmokeFreeMins,
    durationSnusFreeMins: durationSnusFreeMins,
    smokeFreeSincePretty: smokeFreeSincePretty,
    snusFreeSincePretty: snusFreeSincePretty,

    numberOfSnus: numberOfSnus,
    snusSaved: snusSaved,

    numberOfCigs: numberOfCigs,
    cigSaved: cigSaved,
    tarInMg: tarInMg,
    nicotineInMg: nicotineInMg,
    ammoniaInMg: ammoniaInMg,

    moneySaved: moneySaved,
    moneySavedPretty: moneySavedPretty
};
