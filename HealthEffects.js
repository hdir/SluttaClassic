const Observable = require('FuseJS/Observable');
var Model = require("UserData");
var healthEffectsSelectedTab = Observable("røyk");

healthEffectSmoking = [
    {
        "name" : "Hud",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Når du er røykfri, har huden det bedre, og du får mindre rynker.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: Når du røyker får du mindre oksygen i blodet. Nikotin gjør at de små blodårene i huden trekker seg mer sammen og huden får dårligere tilgang på næring. Med alderen blir det vanskeligere for huden å reparere cellene sine. De elastiske fibrene og støttefibrene i huden (kollagen og elastin) som gir styrke og smidighet, ødelegges raskere. Dette gir rynkete og slapp hud.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
    {
        "name" : "Tenner",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Når du er røykfri, får du bedre ånde og tennene blir ikke lenger misfarget av røyken.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: Røykere er tørrere i munnen enn dem som ikke røyker. Spyttet er antibakterielt og bidrar til å rense munnen. De som røyker har derfor mer bakterier i munnen, og det dannes  belegg på tennene. Dette belegget blir etter hvert hardt og gir misfargede tenner. I tillegg er tjære og nikotin med på å farge tennene og slimhinnene. Røyking skader også tannkjøttet, og gir økt risiko for tannløsning. I løpet av voksenlivet mister røykere syv ganger flere tenner, enn ikke-røykere.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
    {
        "name" : "Immunforsvar",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Når du er røykfri, blir du mindre syk.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: Røyking fører til dårligere lungefunksjon, og røyking kan begrense lungeutviklingen hos unge. De som røyker er mer utsatt for luftveissykdommer, kreft og hjerte- og karsykdommer.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
    {
        "name" : "Kondisjon",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Når du er røykfri, får du bedre kondisjon.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: Hos røykere tar karbonmonoksid (kullos) opp plassen til oksygenet i blodet. Mindre oksygen i blodet gir mindre surstoff til de arbeidende musklene. Det utgjør en begrensende faktor når du anstrenger deg, blant annet i form av melkesyre og dårligere kondisjon.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
    {
        "name" : "Potens og hormoner",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Når du er røykfri, er du befre beskyttet mot ereksjonsproblemer og for tidlig aldring.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: Røyking fører til at blodkarene trekker seg sammen og hindrer blodsirkulasjonen. Derfor er det naturlig at røyking også gir potensproblemer. For kvinner bryter røyking ned hormonet østrogen. Det innebærer blant annet at kvinnens naturlige beskyttelse mot hjerte- og karsykdommer, reduseres. Hormonendringene kan også føre til beinskjørhet og tidligere overgangsalder.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
    {
        "name" : "Helserisiko",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Når du er røykfri, unngår du sykdommer som skyldes røyking.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: Studier viser at de som røyker daglig, i snitt dør ti år tidligere enn de som ikke røyker. 25 prosent av dem som røyker daglig, mister 20-25 år av livet sitt i forhold til gjennomsnittlig levealder for en som ikke røyker.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
    {
        "name" : "Svangerskap",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Røyking kan gjøre det vanskeligere å bli gravid, og gi økt risiko for både mor og barn.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: Røyking gir økt risiko for spontanabort, svangerskap utenfor livmoren og svekket morkakefunksjon. Sigaretter inneholder nikotin som fører til at blodårene trekker seg sammen. Det gir dårligere blodtilstrømning til fosteret gjennom morkaken. Røyking øker risikoen for dødfødsel, for tidlig fødsel og lav fødselsvekt hos barnet.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
];

healthEffectSnus = [
    {
        "name" : "Avhengighet",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Når du er snusfri, har du kvittet deg med et sterkt avhengighetsskapende produkt.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: Nikotin i snus tas opp i blodet gjennom slimhinnene i munnen. Kort tid etter at snusen er i munnen, når nikotinet hjernen. Her frigjøres stoffer i belønningssystemet. Dette gir en beroligende, men samtidig stimulerende effekt. Mangel på nikotintilførsel vil raskt gi abstinenssymptomer. Det er kombinasjonen av disse virkningene som skaper avhengighet.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
    {
        "name" : "Tenner",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Når du ikke snuser, slipper du å bekymre deg over misfarging av tennene pga. snus.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: På tennene er det mikroskopiske sprekker og uregelmessigheter som snusen setter seg i. I tillegg kan tannkjøttet i området der snusen plasseres, trekke seg tilbake og gi lange tannhalser. Dette øker risikoen for ising og hull. I verste fall kan det føre til at tennene dine løsner.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
    {
        "name" : "Munnen",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Når du ikke snuser, slipper du å irritere slimhinnene i munnen.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: Snus kan føre til endringer i munnslimhinnen der snusen plasseres. Noen endringer kan gå tilbake, andre ikke. Ved langvarig bruk kan det oppstå en fordypning som kalles snuslomme.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
    {
        "name" : "Helse",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Når du ikke snuser, slipper du å bekymre deg for snusens negative virkning på helsa.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: EU og WHO har klassifisert snus som kreftfremkallende. Bukspyttkjertel og spiserør er mest utsatt. Snus gir også økt dødsrisiko ved hjerteinfarkt.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
    {
        "name" : "Fysisk trening",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Når du ikke snuser, slipper du å få økt puls og blodtrykk pga. snusen.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: Når blodtrykker stiger, må hjertet arbeide hardere. En norsk studie viser at snus øker risiko for skader på muskler og skjelettet. Det er også mulig at skader i vev og muskler heles saktere når du bruker snus.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
    {
        "name" : "Overvekt",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Når du ikke snuser, slipper du å bekymre deg for endringer i stoffskiftet.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: Det er en mulig sammenheng mellom snusing og utvikling av type 2 diabetes og overvekt på grunn av endringer i stoffskiftet.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
    {
        "name" : "Svangerskap",
        "prevtitle": "Tilbake",
        "textnodes" : [
            {
                "title" : "",
                "innertext" : "Snusing i svangerskapet gir mange av de samme effektene på fosteret som røyking.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
            {
                "title" : "",
                "innertext" : "Fakta: Snus inneholder nikotin som fører til at blodårene trekker seg sammen. Det gir dårligere blodtilstrømning til fosteret gjennom morkaken. Bruk av snus øker risikoen for dødfødsel og for tidlig fødsel. Snusing gir også lavere fødselsvekt hos barnet og øker risikoen for pustestans og leppe- og ganemisdannelser.",
                "listitems": [],
                "dottedlistitems": [],
                "numberedlistitems": [],
            },
        ],
    },
];

var currentPage = Observable("healthTabRoyk");

var smokePage = function() {
    currentPage.value = "healthTabRoyk";
};

var snusPage = function() {
    currentPage.value = "healthTabSnus";
};

module.exports = {
    healthEffectSmoking : healthEffectSmoking,
    healthEffectSnus : healthEffectSnus,
    currentPage: currentPage,
    smokePage: smokePage,
    snusPage: snusPage,
    userData: Model.getUserData()
};
