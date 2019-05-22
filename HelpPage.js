const Observable = require('FuseJS/Observable');
var AppEvents = require("AppEvent");
var Model = require("UserData");

var modal_visible = Observable(false);
var popup_visible = Observable(false);
var popup_visible_reset = Observable(false);
var popup_visible_fortsett = Observable(false);

var approval_message_array = [
    "Dette er begynnelsen på å være kvitt røyken eller snusen for alltid!",
    "Bra! Stå på videre.",
    "Supert! Du er flink.",
    "Fantastisk jobba!",
    "Flott – ikke alle er like flink som deg!",
    "Fint – du er et godt forbilde!",
    "Du er viljesterk!",
    "Du har virkelig bestemt deg!",
    "Flott levert!",
    "Så bra!",
    "Flott! Kroppen din elsker det.",
    "Så flink du er!",
    "Nyt at du er så flink!",
    "Du kan når du vil!",
    "Det er bare så bra!",
    "Helt forbilledlig!",
    "Bra, du følger planen din om å bli tobakksfri.",
    "For hver gang du står i mot, blir du sterkere.",
    "Helt strålende.",
    "Du er en dag nærmere å ha levd resten av ditt liv som tobakksfri!",
    "Alle som har vært gjennom en snus- eller røykeslutt, vet at du jobber hardt for dette. Du kan være stolt av deg selv.",
    "Veldig bra!",
    "Innsatsen gir resultater!"
];
var fortsett_message_array = ["Det er vanlig å ha en glipp når du slutter. De fleste som blir tobakksfrie har flere slutteforsøk bak seg. Ønsker du å fortsette programmet?"];
var fortsett_message_array2 = ["Så fint! Lag deg en strategi for hva du skal gjøre når suget kommer."];

var help_message_array = [
    "Lag deg en strategi for å holde ut suget. Kall det gjerne en 5-minutter.",
    "Det verste suget etter nikotin går over etter noen minutter, og abstinensplagene blir svakere etter noen dager.",
    "Vær aktiv! Gå eller løp deg en tur! Pust dypt inn, og finn på noe som får deg til å føle deg litt bedre.",
    "Tenk på at det verste er over om kort tid.",
    "Etter at du har sluttet er det normalt at det dukker opp tanker om hvor godt det var.  Prøv å la disse tankene få minst mulig oppmerksomhet. Som avledning kan du ringe noen eller drikke noe syrlig.",
    "Ubehag? Dessverre er ubehag noe alle må gjennom når de slutter. Vær snill mot deg selv, og pass på å drikke mye vann og spise små måltider ofte. Da holder du blodsukkeret jevnere og det får deg til å føle deg litt bedre.",
    "Hold ut! Bestem deg for at du fortjener en premie om du holder ut til i morgen. Trenger du mer hjelp? Se slutta.no",
    "Abstinensplager? Det hjelper å tenke på abstinensplager som et tegn på at kroppen kvitter seg med avhengigheten. Pass på at du drikker nok vann dersom du føler deg svimmelt eller uvel. ",
    "Spill et spill eller ta deg en tur ut. Det pleier å hjelpe å tenke på noe annet.",
    "Støtte fra andre er godt å få! Fortell en venn eller kollega at du har sluttet. Kanskje du får din egen personlige sluttesupporter;)",
    "Snakk med andre som også vil eller skal slutte. Det er godt å vite at du ikke er alene.",
    "Tenk på at du har folk rundt deg som beundrer deg for at du har sluttet.",
    "Prøv å spore tankene dine inn på noe annet, eller avled deg selv ved å spise pastiller, frukt eller noe annet.",
    "For hver gang du klarer å la være, er du ett skritt nærmere målet!",
    "Hvis du klarer å avlede deg selv de få minuttene suget varer, har du vunnet!",
    "Tenk på hva du sparer av penger. For 25 000 i året får du gjort mye hyggelig.",
    "Er du stressa? Det hjelper å gi stresshormonene noe å gjøre, vær fysisk aktiv! Gå, løp, syng, dans …!",
    "Hold fokus! Du er på vei bort fra avhengigheten.",
    "Ta 10 dype pust med magen!",
    "Skriv ned tre gode grunner til at du skal holde deg tobakksfri.",
    "Tenk på at du ikke lenger trenger å bekymre deg over helseskader tobakk kan gi deg.",
    "Gi deg selv en peptalk. Psyk deg opp ved å fortelle deg selv hvor fantastisk bra det er at du har sluttet og at du skal klare å komme gjennom dette.",
    "Er det tungt å holde ut abstinensene, kan du prøve nikotinlegemidler.  Snakk med legen din eller apoteket om du har spørsmål.",
    "Husk at du får friskere pust, finere tenner og bedre munnhygiene uten tobakk.",
    "Tenk positivt! Tenk at du skal klare det, og at suget alltid går over og blir svakere etter hvert.",
    "Ring eller send SMS til en venn.",
    "Forsøk å slappe av og vent til nikotinsuget har gitt seg. Nikotinsuget varer i noen minutter om gangen.",
    "Husk 5-minutter’n din.",
    "Pust rolig inn gjennom nesen og ut gjennom munnen. Det blir verre om du forsøker å kjempe imot.",
    "Tenk på at du gjør dette for din egen skyld!",
    "Husk at kroppen din er i ferd med å kvitte seg med avhengigheten. Det blir bedre!",
    "Pugg alle versene av ”Ja, vi elsker”.",
    "Gå opp og ned trappa tre ganger eller hopp opp og ned 10 ganger.",
    "Det finnes dessverre ingen mirakelkur som tar bort alt ubehag og savn. Men ubehaget er et sikkert tegn på at du er i gang med å kvitte deg med avhengigheten. Forsøk å akseptere at det er en tung periode før det blir lettere.",
    "Fortell deg selv at dette tåler du og at du skal klare det.",
    "Husk at du mange ganger har tenkt: Det er på tide å slutte!",
    "Tenk på at du nå slipper jaget etter tobakk! Det skal ikke lenger dominere livet ditt.",
    "Dette klarer du!",
    "Tygg på litt fersk ingefær, det kan hjelpe.",
    "Puss tennene! Frisk smak i munnen gir en god følelse.",
    "Ta en dusj eller et avslappende bad.",
    "Gå ut og trekk litt frisk luft.",
    "Ta noe i munnen, for eksempel en tannpirker.",
    "Husk at dette er det beste du kan gjøre for helsen din!",
    "PUST! Hjernen din trenger rett mengde oksygen og karbondioksid for å tenke klart. Pust deg gjennom røyksuget ved å puste inn (gjennom nesen) og ut (gjennom munnen), gjør dette 10 ganger.",
    "Ta en tyggis.",
    "Sett på favorittsangen din.",
    "Spill et spill på mobilen eller finn en aktivitet du liker godt. Gjør det.",
    "Minn deg selv på hvorfor du vil slutte.",
    "Minn deg selv på andre vanskelige situasjoner du har kommet gjennom. Du kan klare dette også. Ta en dag om gangen!",
    "Ta ti knebøy.",
    "Trenger du ekstra støtte? Gå inn på slutta.no for å finne flere tips.",
    "Handling foran ord! Du er godt i gang nå, dette klarer du!",
    "Sett på musikk som gjør deg glad og som gir deg krefter til å bekjempe nikotinsuget."
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var random = getRandomInt(0, 2);
var approval_message = Observable();
var fortsett_message = Observable();
var fortsett_message_2 = Observable();
var help_message = Observable();
var randomBg = Observable("Assets/bg_03.jpg");

var cycleRandomBg = function() {
    var bgs = [
                "Assets/bg_02.jpg",
                "Assets/bg_03.jpg"
              ];
    randomBgNumber = Math.floor(Math.random() * bgs.length);
    randomBg.value = bgs[randomBgNumber];
}

help_message.value = help_message_array[getRandomInt(0, 2)];
fortsett_message_2.value = "Bra! Bruk erfaringene dine til å lykkes enda bedre nå.";

module.exports = {
    gotoMoreTips: function(args) {
        depRouter.push("navMoreTipsPage", args.data)
        AppEvents.logEvent('fleretips_click');
    },
    gotoStressed: function(args) {
        depRouter.push("navStressedPage", args.data)
        AppEvents.logEvent('stressa_click');
    },
    gotoHome: function(args) {
        depRouter.push("navFrontPage", args.data)
    },
    showApprovalPopup: function(args) {
        modal_visible.value = true;
        popup_visible.value = true;
        approval_message.value = approval_message_array[getRandomInt(0, approval_message_array.length - 1)];
        AppEvents.logEvent('feil_nei_click');
    },
    hideApprovalPopup: function(args) {
        modal_visible.value = false;
        popup_visible.value = false;
    },
    showResetPopup: function(args) {
        modal_visible.value = true;
        popup_visible_reset.value = true;
        fortsett_message.value = fortsett_message_array[0];
        AppEvents.logEvent('feil_ja_click');
    },
    hideResetPopup: function(args) {
        AppEvents.logEvent('feil_ja_reset_click');
        modal_visible.value = false;
        popup_visible_reset.value = false;
        var data1 = {'id':'reset'};
        depRouter.push("navSettingsPage", data1);
    },
    hideResetPopup_ShowFortsett: function(args) {
        popup_visible_reset.value = false;
        popup_visible_fortsett.value = true;
    },
    hideFortsettPopup: function(args) {
        popup_visible_fortsett.value = false;
        modal_visible.value = false;
    },
    modal_visible: modal_visible,
    popup_visible: popup_visible,
    popup_visible_reset: popup_visible_reset,
    popup_visible_fortsett: popup_visible_fortsett,
    approval_message: approval_message,
    fortsett_message: fortsett_message,
    fortsett_message_2: fortsett_message_2,
    help_message: help_message,
    randomBg: randomBg,
    cycleRandomBg: cycleRandomBg,
    userData: Model.getUserData(),
    onActivated: function(args) {
        help_message.value = help_message_array[getRandomInt(0, 53)];
    },
};
