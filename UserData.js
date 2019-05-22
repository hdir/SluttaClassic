const Observable = require('FuseJS/Observable');
var FileSystem = require("FuseJS/FileSystem");
var Storage = require("FuseJS/Storage");
const moment = require('ExtraJS/moment');
var DateTimeHelpers = require("DateTimeHelpers");
var DefaultNotifications = require("DefaultNotifications");

var fileName = FileSystem.dataDirectory + "/" + "userData.json";
var userData = {};

// THIS PATHWAY JUST GETS //
// get userdata >
//              calls dispatchLoadUserData >
//                  calls ensuredatahasallfields which adds defaults for any missing
//                      > contains ensureuserpair
//                              > ensureuserpair contains setUserPair (saves to userData)
//                      > once all ensured, calls dispatchSaveUserData
// dispatchSaveUserData >
//              calls getrawdata (which gets the userData object)
//              then saves directly to file

var getUserData = function() {
    if(Object.keys(userData).length == 0)
    {
        EnsureDataHasAllFields();
        dispatchLoadUserData();
    }
    return userData;
}

var resetAndSaveUserData = function() {
    userData.value = {};
    getUserData()["smokes"].value = false;
    getUserData()["snus"].value = false;
    EnsureDataHasAllFields();
    dispatchSaveUserData();
}

var isObject = function(val) {
    return (val !== null && typeof val === 'object');
}

var isSerializedDate = function(val) {
    return isObject(val) && val.hasOwnProperty("_DATE_");
}

var preSaveConversion = function(val) {
    if (val instanceof Date) {
        return { "_DATE_" : val.valueOf() };
    } else {
        return val;
    }
};

var postLoadConversion = function(val) {
    if (isSerializedDate(val)) {
        return new Date(val["_DATE_"]);
    } else {
        return val;
    }
};

var dispatchLoadUserData = function() {
    FileSystem.exists(fileName).then(function(fileExists) {
        if (fileExists) {
            FileSystem.readTextFromFile(fileName).then(function(contents) {
                var dataObj = JSON.parse(contents);
                for (var key in dataObj) {
                    if (dataObj.hasOwnProperty(key)) {
                        var val = postLoadConversion(dataObj[key]);
                        if (userData.hasOwnProperty(key)) {
                            userData[key].value = val;
                        } else {
                            userData[key] = Observable(val);
                        }
                    }
                }
                EnsureDataHasAllFields();
                dispatchSaveUserData();
            }, function(error) {
            });
        } else {
            EnsureDataHasAllFields();
            dispatchSaveUserData();
        }
    }, function(error) {
    });
};

var EnsureDataHasAllFields = function() {
    ensureUserPair("_save_count_", 0);
    ensureUserPair("smokes",  false);
    ensureUserPair("dailyCigarettes", {NameEn: "3"});
    ensureUserPair("pricePerCigarette", {NameEn: "6,00"});
    ensureUserPair("smokeFreeSince", moment().toDate());
    ensureUserPair("quitSmokingReason", {NameEn: "Helse"});
    ensureUserPair("hoverQuitSmokingReason", {NameEn: "Helse"});
    ensureUserPair("snus", false);
    ensureUserPair("dailySnus", {NameEn: "3"});
    ensureUserPair("pricePerSnus", {NameEn: "5,00"});
    ensureUserPair("snusFreeSince", moment().toDate());
    ensureUserPair("quitSnusReason", {NameEn: "Helse"});
    ensureUserPair("allowCameraBackground", false);
    ensureUserPair("dailyNotifications", DefaultNotifications.default_notifications);
    ensureUserPair("mustShowZeroDayNotifSmoke", false);
    ensureUserPair("mustShowZeroDayNotifSnus", false);
};

var ensureUserPair = function(key, val) {
    if (!userData.hasOwnProperty(key))
    {
        userData[key] = Observable(val);
    }
}

var dispatchSaveUserData = function() {
    var dataString = JSON.stringify(getRawUserData());
    FileSystem.writeTextToFile(fileName, dataString).then(function() {
        userData["_save_count_"].value += 1;
    }, function(error) {
    });
};

var getRawUserData = function() {
    var rawObj = {};
    for (var key in userData) {
        if (userData.hasOwnProperty(key)) {
            rawObj[key] = preSaveConversion(userData[key].value);
        }
    }
    return rawObj;
};

var resetSmokeSince = function() {
    getUserData()["smokeFreeSince"].value = moment().toDate();
};

var resetSnusSince = function() {
    getUserData()["snusFreeSince"].value = moment().toDate();
};

module.exports = {
    getUserData: getUserData,
    resetAndSaveUserData: resetAndSaveUserData,
    dispatchLoadUserData: dispatchLoadUserData,
    dispatchSaveUserData: dispatchSaveUserData,
    resetSmokeSince: resetSmokeSince,
    resetSnusSince: resetSnusSince,
};
