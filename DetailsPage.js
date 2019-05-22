const Observable = require('FuseJS/Observable');
var DateTimeHelpers = require("DateTimeHelpers");
var Model = require("UserData");
var UserTimeObservables = require("UserTimeObservables");
var FrontPage = require("FrontPage");

var smoking_ingredients = {
    "Ammoniakk": [
        "Ammoniakk tilsettes i tobakken for å øke opptaket av nikotin og forsterke avhengigheten.",
        "Ammoniakk brukes i moderne gjødselproduksjon.",
        "Ammoniakk finnes i sterke vaskemidler, som for eksempel salmiakk."
    ],
    "Nikotin": [
        "En engangsdose nikotin på 65 milligram er dødelig for mennesker.",
        "Nikotin finnes naturlig som beskyttelsemot insekter i planter, og har blitt brukt som insektmiddel.",
        "Nikotin er like avhengighetsskapende som kokain og heroin. Unge kan bli avhengige uten å røyke daglig.",
        "Det tar 5-7 min å røyke en sigarett. Minutter du har spart, kan du bruke på hva du vil."
    ],
    "Tjære": [
        "Tjære er et sterkt kreftfremkallende stoff!",
        "Tjære brukes som impregnering av båter og hus og gir treverk en særegen glød. Huden din får ikke samme glød.",
        "Tjære er en tyktflytende væske som kleber seg til lungeveggene, slik at du får dårligere pust.",
        "Ca. 90 % av alle tilfeller av lungekreft i Norge er forårsaket av røyking."
    ],
};

var snus_ingredients = {
    "Nikotin": [
        "Nikotin er et giftig og avhengighetsdannende stoff.",
        "Nikotin kan blant annet føre til sammentrekning av blodårene dine og en økning av blodtrykket. Dette kan føre til økt belastning på hjertet.",
        "Nikotin blir klassifisert som et rusmiddel.",
        "Nikotin har både en oppkvikkende og en beroligende effekt, avhengig av mengde.",
        "Nikotin gir både psykisk og fysisk avhengighet.",
        "Nikotin er et giftig alkaloid, som man kan finne i tobakksplanter.",
        "Nikotin er en effektiv insektsdreper, og har konserverende virkning.",
        "Nikotin øker produksjonen av saltsyre i magesekken, og kan forverre magesår og spiserørsbetennelse."
    ],
    "Bly": [
        "Bly finnes i store mengder i bilbatteri.",
        "Bly er et giftig tungmetall som lagres i kroppen.",
        "Bly kan hemme mental utvikling.",
        "Bly kan skade nervesystemet og gjøre deg blodfattig.",
        "Bly brukes ikke lenger i bensin, maling eller i vannrør på grunn av de alvorlige helsefarene.",
        "Bly brukes som fargestoff i keramikk.",
        "Bly brukes ofte i ammunisjon på grunn av den høye tettheten.",
        "Bly brukes som beskyttelse mot radioaktiv stråling.",
        "Bly brukes som tilsetningsstoff i krystallglass (blyglass)."
    ],
    "Kvikksølv": [
        "Kvikksølv er det stoffet som tidligere fikk termometeret til å virke. Det er fjernet fordi det er et meget skadelig stoff.",
        "Kvikksølv er et tungmetall som er flytende i romtemperatur.",
        "Det er spesielt farlig å puste inn dampen av kvikksølv.",
        "Kvikksølvdampen kan selv i små mengder gi skader i hjernen.",
        "Kvikksølv kan føre til akutt forgiftning, med døden som resultat.",
        "Kvikksølv utgjør en stor risiko for helse og miljø.",
        "Kvikksølv er blant de farligste miljøgiftene og utgjør i dag en trussel for miljøet og menneskers helse både i Norge og globalt.",
        "Kvikksølv transporteres over lange avstander med hav- og luftstrømmer.",
        "Kvikksølv og ulike kvikksølvforbindelser er svært giftige, og kan derfor gi skade på mennesker og dyr. Inntak av og kontakt med ulike kvikksølvforbindelser kan bl.a. gi varig skade på hjernen, særlig hos fostre. Det kan øke hjerterytmen og blodtrykket og dermed føre til hjerte- og karsykdommer. "
    ],
    "Arsenikk": [
        "Arsenikk er lukt- og smakløst, og meget giftig.",
        "Arsenikk finnes i små mengder i snus. Det er en dødelig gift, som får leppene dine til å svi og som gir deg dårlig ånde.",
        "Arsenikk i små mengder gir irritasjon og smerter ved innånding og hudkontakt.",
        "Arsenikk brukes i skadedyrbekjempelse og ved fremstilling av opaliserende glass og emalje.",
        "Arsenikk var en fryktet gift i flere europeiske kongehus i middelalderen.",
        "Arsenikk er et oksid, som kan fremstilles ved forbrenning av grunnstoffet arsen.",
        "Arsenikk er i ren form et fast, hvitt pulver.",
        "Arsenikk er svært giftig. Ett gram arsenikk er gift nok til å drepe fem mennesker.",
        "Arsenikk hører med blant kategorien uorganiske stoffer. I sjømat forekommer arsen hovedsakelig i form av organiske forbindelser, som regnes som ufarlige.",
        "Arsenikk brukt til mord var vanskelig å avsløre, og flere tidlige krimforfattere, bl.a. Agatha Christie, utnyttet dette litterært."
    ],
    "Krom": [
        "Krom er et kreftfremkallende tungmetall.",
        "Krom i enkelte forbindelser er kreftfremkallende og allergifremkallende.",
        "Krom inngår i en rekke produkter, blant annet impregnert trevirke og lær, tekstilfarging, stållegeringer og maling.",
        "Krom eksponeres for mennesker hovedsakelig gjennom næringsinntak, drikkevann og ved innånding.",
        "Enkelte kromforbindelser er også klassifisert som arvestoffskadelig. "
    ],
    "Kadmium": [
        "Kadmium kan bli i kroppen i årevis og skade lever, nyre, skjelett og hjerne.",
        "Kadmium kan gi økt blodtrykk og hjertesvekkelse.",
        "Kadmium er kreftfremkallende og fosterskadelig.",
        "Kadmium er et metall som blant annet brukes i batterier og på rustutsatte steder på biler.",
        "Kadmium er en svært utbredt miljøgift og en betydelig global forurenser."
    ],
    "Nitrosaminer": [
        "Nitrosaminer er kreftfremkallende i en slik grad at EUs vitenskapelige komité har konkludert med at det ikke finnes en sikker minstegrense for inntak av disse stoffene.",
        "Nitrosaminer i høye konsentrasjoner regnes som en sikker risikofaktor i utvikling av magesekkreft.",
        "Nitrosaminer dannes fra det kjemiske stoffet nitrat og anvendes bl.a. som konserveringsmiddel.",
        "Nitrosaminer finnes i snus og i ulike matvarer og i drikkevann.",
        "Kreftfremkallende tobakkspesifikke nitrosaminer fra snus går over i blodbanen og kan påvirke f.eks. bukspyttkjertelen.",
        "Nitrosaminer, en gruppe organiske forbindelser, hvorav mange har karsinogene (kreftfremkallende) egenskaper."
    ],
    "Polonium": [
        "Polonium er et naturlig forekommende radioaktivt metall.",
        "Polonium isotoper dannes i kjernefysisk industri.",
        "Det er et veldig radioaktivt og ekstremt giftig grunnstoff uten spesiell smak eller lukt.",
        "Polonium løses opp av syrer som saltsyre, svovelsyre og salpetersyre, men løses bare langsomt opp av basiske løsninger.",
        "Polonium ble, ifølge al-Jazeera, målt i høye nivåer i kroppen til Yassir Arafat da han døde.",
        "Polonium er kjent som Radium F. Det er meget radioaktivt og lite utbredt, bortsett fra på steder hvor det brukes til militære eller vitenskapelige formål.",
        "Polonium forekommer i naturen, og sender ut meget helseskadelig alfastråling.",
        "Polonium er ett av de sjeldneste stoffene i verden, men alle mennesker har mikroskopiske mengder av det i kroppen.",
        "Polonium ble oppdaget av Marie Curie på slutten av 1800-tallet, som oppkalte det etter sitt hjemland Polen.",
        "Polonium i høye doser ødelegger vev og organer.",
        "Polonium er meget helseskadelig, og det er svært vanskelig å identifisere for leger."
    ]
};

var snus_ingredients_images = {
    "Nikotin": ["Assets/DetailsPage/toxin_nicotine.png"],
    "Bly": ["Assets/DetailsPage/toxin_lead.png"],
    "Kvikksølv": ["Assets/DetailsPage/toxin_mercury.png"],
    "Arsenikk": ["Assets/DetailsPage/toxin_arsenic.png"],
    "Krom": ["Assets/DetailsPage/toxin_chromate.png"],
    "Kadmium": ["Assets/DetailsPage/toxin_cadmium.png"],
    "Nitrosaminer": ["Assets/DetailsPage/toxin_nitrosamines.png"],
    "Polonium": ["Assets/DetailsPage/toxin_polonium.png"],
};

var smoking_health_facts = [
    "Nå som du er røykfri, utsetter du ikke kroppen din for skadelige stoffer fra tobakk som kan gjøre deg alvorlig syk.",
    "Du er nå i gang med å forlenge livet ditt med minst 10 år.",
    "Ca. 6 millioner mennesker i verden dør hvert år på grunn av røyking.",
    "Det radioaktive stoffet Polonium 210 finnes i sigaretter og er en av de viktigste faktorene som fører til lungekreft.",
    "De fleste røyker ikke fordi de vil, men fordi de har blitt avhengige av nikotin.",
    "Mer enn 80 prosent av dem som røyker daglig, begynte før de var 20 år.",
    "Nikotin er et sterkt avhengighetsskapende stoff. Nikotin kommer fra navnet til en fransk ambassadør (Jean Nicot), som brakte stoffet til Portugal i 1559.",
    "Omtrent halvparten av dem som røyker daglig i mange år, dør av sykdommer som skyldes tobakken.",
    "Å slutte å røyke er det beste du kan gjøre for helsa di.",
    "4 av 5 som røyker daglig, angrer på at de begynte.",
    "Globalt tar tobakk flere liv enn AIDS, narkotika, trafikkulykker, drap og selvmord til sammen.",
    "Det lukter av deg når du har røykt, og bakteriebelegget du får i munnen gir i tillegg dårlig ånde.",
    "De fleste som røyker ønsker å slutte.",
    "De fleste som begynner å røyke, har en bestevenn som også røyker.",
    "I 1859 ble den første rapporten som linket røyking til sykdommer, publisert.",
    "Røyking gir økt rynkedannelse i huden, nedsatt luktesans- og smaksevne og misfarging av tennene.",
    "Risikoen for avhengighet er stor. Dersom du kjenner 20 personer som røyker, er det kun én av dem som kanskje ikke blir avhengig av nikotin.",
    "Selv små mengder tobakksrøyk kan skade arvestoffet (DNA), som igjen kan føre til kreft.",
    "Det er beregnet at ca. 100 000 barn i Norge utsettes for passiv røyking. Passiv røyking er skadelig.",
    "De fleste som prøver å slutte, trenger noen forsøk før de klarer det.",
    "Tidligere trodde folk at nikotin kunne behandle skader og sykdommer som kreft og astma.  ",
    "De færreste unge røyker. Du som slutter nå, er en av mange røykfrie.",
    "Røyking under svangerskapet øker risikoen for spontanabort, komplikasjoner i svangerskapet, dødfødsel og for tidlig fødsel."
]

var snus_health_facts = [
    "Nå som du er snusfri, sparer du kroppen din for helseskadelige stoffer som kan gjøre deg alvorlig syk.",
    "Snus inneholder mer enn 30 stoffer som har kjent kreftfremkallende virkning. Stoffene som er forbundet med kreftrisiko, er først og fremst nitrosaminer og tungmetaller.",
    "Har du abstinenser? Tenk på det som om kroppen din renser seg.",
    "Ved langvarig snusbruk kan det utvikles en ”snuslomme” med en fortykkelse i munnslimhinnen der snusen plasseres.",
    "Bruk av snus gir økt dødsrisiko ved hjerteinfarkt.",
    "De fleste endringer i munnslimhinnen forårsaket av langvarig snusbruk leges av seg selv dersom man slutter å bruke snus.",
    "Nikotin kommer fra navnet til en fransk ambassadør (Jean Nicot), som brakte stoffet til Portugal i 1559.",
    "Nikotin har en sammentrekkende virkning på blodårene, noe som gjør at du får økt puls og blodtrykk. Dette skjer med en gang du legger snusen i munnen, og varer den tiden snusen ligger inne.",
    "Tannkjøttet i området der snusen plasseres, kan trekke seg tilbake og gi lange tannhalser. Det kan føre til plagsom ising i tennene.",
    "Mange som snuser tenker mye på å slutte.",
    "16-åringer som snuser, har økt risiko for både å røyke og snuse som 19-åringer.",
    "Mange som snuser begynte fordi noen de kjenner gjorde det. Har du tenkt på hvorfor du begynte? ",
    "Å slutte å snuse er bra for helsa di.",
    "Forandringer i munnslimhinnen av snusbruk kan sees som hvite, ikke avskrapbare flekker på slimhinnen. Slike forandringer bør undersøkes, ettersom det kan være et forstadium til munnhulekreft.",
    "De fleste som prøver å slutte, trenger noen forsøk før de klarer det.",
    "Tidligere trodde folk at nikotin kunne behandle skader og sykdommer som kreft og astma.",
    "Snusing under svangerskapet er svært uheldig for fosteret.",
    "Risikoen for avhengighet er stor dersom du snuser.",
    "Snusbruk øker faren for kreft i bukspyttkjertel og spiserør.",
    "Gravide som snuser har økt risiko for dødfødsel og for tidlig fødsel.",
    "Barn født av kvinner som snuser veier gjennomsnittlig mindre enn barn av kvinner som ikke bruker tobakk. Lav fødselsvekt er en risiko for barnet."
]

var okonomi = {
    "rewards": {
      "0": [
        "gleden av å være røykfri!",
        "en helt gratis joggetur!",
        "luft og kjærlighet!"
      ],
      "100": [
        "en softis og kaffe til deg og en venn",
        "et blad og en smoothie",
        "en drop-in time på treningssenter"
      ],
      "200": [
        "2 kinobilletter ",
        "en 5-ukes lottokupong",
        "en stor sushi-meny"
      ],
      "300": [
        "en tacofest hjemme med vennegjengen",
        "fint undertøy",
        "dagskort i skibakken"
      ],
      "400": [
        "en middag med en venn på restaurant",
        "nytt treningstøy",
        "1 mnd på treningssenter"
      ],
      "500": [
        "en full tank bensin",
        "et pc-spill",
        "sesongens sminke"
      ],
      "600": [
        "et nytt headset med bra lyd",
        "et par sko",
        "et strikkhopp"
      ],
      "700": [
        "en klipp hos frisør ",
        "massasjetime",
        "stekepanne med titanbelegg"
      ],
      "800": [
        "en pulsklokke",
        "nye solbriller",
        "et dagspass på festival"
      ],
      "900": [
        "en billig smartphone",
        "en flytur til København",
        "en liten kaffemaskin"
      ],
      "1000": [
        "nye, freshe joggesko",
        "en blender",
        "nye jeans"
      ],
      "1100": [
        "en billig LED tv",
        "joggesko",
        "abonnement på streaming-tjeneste"
      ],
      "1200": [
        "en bilstereo",
        "et videokamera",
        "bestikksett til 6 personer"
      ],
      "1300": [
        "en dag med fullpensjon på hotell",
        "en ryggsekk",
        "perleøredobber"
      ],
      "1400": [
        "en bra koffert",
        "en sovepose",
        "en jakke du har ønsket deg lenge"
      ],
      "1500": [
        "en skinnjakke",
        "middag for to på god restaurant",
        " være redd-barna-fadder et halvt år"
      ],
      "1600": [
        "en bra DAB radio",
        "en digital printer",
        "et hjemmekino-anlegg"
      ],
      "1700": [
        "et kurs i foto, gitarspilling eller dans",
        "spandert minst 40 kaffe latte ",
        "en fin klokke"
      ],
      "1800": [
        "en pulsklokke med GPS",
        "en Blu-ray spiller",
        "en dockingstasjon"
      ],
      "1900": [
        "en skinnveske",
        "designsolbriller",
        "et festivalpass"
      ],
      "2000": [
        " en gitar",
        "en bærbar pc",
        "en SPA-dag"
      ],
      "2500": [
        "en kaffemaskin med melkesteamer",
        "en god støvsuger",
        "en skalljakke"
      ],
      "3000": [
        "en sydentur",
        "et lesebrett",
        "en skiferie"
      ],
      "3500": [
        "en iskremmaskin",
        "en tredemølle ",
        "et speilrefleks-kamera"
      ],
      "4000": [
        "en tur til New York",
        "en middels dyr smarttelefon",
        "et surroundanlegg til din tv"
      ],
      "4500": [
        "en gore-tex jakke",
        "en tur til Island",
        "en laptop"
      ],
      "5000": [
        "en fin tv",
        "en god kjøkkenmaskin",
        "en ukes SPA-opphold i Estland"
      ],
      "7500": [
        "en luksus gassgrill",
        "et kjøleskap",
        "en god sykkel"
      ],
      "10000": [
        "en jorden-rundt billett",
        "en brukt scooter",
        "en fin reise med opphold. Velg ditt favorittsted"
      ],
      "12500": [
        "en tur til alpene ",
        "en hund",
        "en kajakk"
      ],
      "15000": [
        "en scooter",
        "bryllupsreise til Mauritius",
        "et nytt, flott spisebord"
      ],
      "17500": [
        "møblere en leilighet",
        "en påhengsmotor",
        "en interrail-tur"
      ],
      "20000": [
        "tilhenger til bilen",
        "en brukt seilbåt",
        "en el-sykkel"
      ],
      "30000": [
        "være dyrepasser i Afrika i 3 mnd",
        "en guidet topptur til Kilimanjaro",
        "en bruktbil"
      ],
      "40000": [
        "leie ei hytte nær et skianlegg et helt år",
        "innrede en toroms leilighet",
        "en veldig stor diamantring"
      ],
      "50000": [
        "en 3 mnd backpackertur i Asia",
        "en ny 50 hk påhengsmotor",
        "en total fornying av garderoben"
      ]
  },
  "facts": {
    "0": "Ved å hjelpe folk å stumpe røyken er det mulig å redde millioner på verdensbasis.",
    "100": "Urea, som er et stoff i urin, er også et av tilsetningsstoffene som gir ”aroma” til sigarettene.",
    "200": "Når skogen blir borte forandrer klimaet seg, det blir ørkenaktig. Det er resultatet av tobakksdyrking.",
    "300": "For 300 kroner i måneden kan du støtte en hel søskenflokk som bor alene i Tanzania, uten foreldre eller andre slektninger. I tillegg til støtte til skolegang, får de mat, klær og utstyr til huset sitt.",
    "400": "Dette er nok penger til å kjøre 6 timer i taxi i Tokyo.",
    "500": "Flere tusen barn jobber opptil 16 timer i døgnet på tobakksplantasjene rundt om i verden. Mange av dem tjener mindre på en hel måned enn du gjør på en time!",
    "600": "For 600 kroner i året dekker du utgifter til skolepenger, materiell, skoleuniform, skolemat og helseforsikring for ett barn i Afrika.",
    "700": "Sprøytemidler og kjemikalier som brukes i tobakksproduksjon i utviklingsland er ofte av typer som er forbudt i den vestlige verden.",
    "800": "Utstrakt bruk av gjødsel og giftige sprøytemidler, fører til at barn som jobber med tobakksplanter, svært ofte utvikler eksem, sår- og øyeskader.",
    "900": "Undersøkelser fra Bangladesh viser at fattige hushold kan bruke nærmere 10 ganger mer penger på tobakk enn på utdanning.",
    "1000": "Dette er penger nok til å kjøpe 10 kvadratcentimeter av en luksusleilighet i New York. Utsikt over Central Park er inkludert!",
    "1100": "Song-dynastiet i Kina var det første riket som utstedte papirpenger en gang rundt 900-tallet.",
    "1200": "I 1624 nedsatte pave Urban VIII et forbud mot tobakk i kirken. Tobakken kunne føre til nysing, noe som i litt for høy grad minnet om seksuell nytelse.",
    "1300": "I fengsler, hvor konvensjonelle penger er forbudt, er det ganske vanlig å bruke sigaretter som penger.",
    "1400": "Nikotin har navnet sitt etter den franske ambassadøren Jean Nicot. Han introduserte på midten av 1500-tallet tobakk som medisin.",
    "1500": "1500 kronestykker veier ca. 6,5 kg.",
    "1600": "I Kina beregner man at nærmere 50 millioner mennesker får økonomiske vanskeligheter som følge av tobakk og avhengighet.",
    "1700": "Den som slutter å røyke 20 om dagen, har etter fem år unngått å inhalere 2,5 kilometer sigaretter.",
    "1800": "Nå har du spart mer enn en persons gjennomsnittlige forbruk på mat/drikke pr måned.",
    "1900": "Begrepet «røyking» ble ikke etablert før slutten av det syttende århundre. Før det, var det ofte referert til som «tørr drukkenskap».",
    "2000": "På 50- og 60 tallet ble folk oppfordret til å røyke istedenfor å bruke snus. Spyttingen av snus medførte smittefare, for eksempel av tuberkulose. Den klassiske plakaten «Spytt ikke på golvet» er fra denne tida.",
    "2500": "«Penger gjør ingen lykkelige, men jeg gråter heller i en Jaguar enn på bussen» (Françoise Sagan, fransk forfatter).",
    "3000": "Tobakk kan være tilsatt sukker, noe diabetikere ofte ikke er klar over!",
    "3500": "Oldtidens Kina, Afrika og India brukte porselensskjell som penger.",
    "4000": "Tobakksplanten ble på 1500-tallet brukt i pilleform, som pulver og i blanding med andre stoffer, også som snus. Tobakken ble pustet inn gjennom nesen (snust) og nyst ut igjen. Mange av datidens vitenskapsmenn var skeptiske: Tobakken sotet jo til hjernen, og det kunne umulig være sunt.",
    "4500": "«Jeg har brukt mye penger på drinker, damer og dyre biler. Resten bare kasta jeg bort» (George Best, engelsk fotballspiller).",
    "5000": "Dersom du lar være å røyke 20 sigaretter om dagen i ett år, gir du deg selv 850 timer til å gjøre andre ting.",
    "7500": "I år 1900 kunne man kjøpe seg et par sko for fem kr!",
    "10000": "Da Sultan Murad IV forbød røyking i Det osmanske riket i 1633, var det med ekstreme virkemidler: Opptil 18 mennesker ble henrettet daglig for brudd på loven. Forbudet ble opphevet i 1647.",
    "12500": "Det blir trykket opp flere papirpenger for spillet Monopol, enn ekte pengesedler.",
    "15000": "Tobakk ble på midten av 1600-tallet tenkt brukt til å kurere syfilis.",
    "17500": "«We don’t smoke the shit, we just sell it. We reserve the right to smoke for the young, the poor, the black and the stupid.” (uttalt av amerikansk tobakksprodusent).",
    "20000": "Nikotin ble tidligere brukt til å ta knekken på bladlus. Krimforfatter Agatha Christie benytter nikotin som drapsvåpen i en av sine bøker.",
    "30000": "En papirpenge kan brettes fram og tilbake 4000 ganger før den går i stykker.",
    "40000": "Nikotin sies å være like avhengighetsskapende som heroin og kokain.",
    "50000": "«Jeg ønsker ikke å tjene penger. Jeg vil bare være vidunderlig.» (Marilyn Monroe, amerikansk filmstjerne)."
  },
};


/* -----------

   OBSERVABLES

 ----------- */

var moneySavedChosen = Observable();
var moneySavedChosenPretty = Observable();
var pricePerUnit = Observable();
var pricePerUnitPretty = Observable();
var featuredPoisonTitle = Observable();
var featuredPoisonImage = Observable();
var featuredPoisonFact = Observable();
var healthInfo = Observable();
var isSmoke = Observable();
var type = Observable();
var dayspassed = Observable();
var reward1 = Observable();
var reward2 = Observable();
var reward3 = Observable();
var featuredOkonomiFact = Observable();

var notes = Observable();
var coins = Observable();

// var moreThanZero = Observable();
//
// moreThanZero.value = false;

this.Parameter.onValueChanged(module, function(param) {
	isSmoke.value = param.isSmoke;
});


/* --------

   HELPERS

 -------- */

// this returns a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// returns a random string from a dictionary
function get_single_string(myDict) {
    var count = 0;
    for (var key in myDict) {
        count++;
    }
    var randomint = getRandomInt(0, count-1);
    return myDict[randomint];
}

// returns a random key value from a dictionary
function get_single_key(myDict) {
    var count = 0;
    var newArray = [];
    for (var key in myDict) {
        count++;
        newArray.push(key);
    }
    var randomint = getRandomInt(0, count-1);
    return newArray[randomint];
}


/* --------------------------------

   FUNCTIONS
   // the core crunchers
   // aka everything that returns
   // data for use in the page

 -------------------------------- */

// this function populates some observables for cigarettes OR snus
function populateValuesForChosen() {
    var userData = Model.getUserData();

    if (isSmoke.value == true) {
        type.value = "røyk";
        pricePerUnit.value = userData["pricePerCigarette"].value.NameEn;
        if (pricePerUnit.value.substring(pricePerUnit.value.indexOf('.')+1) == '00') {
            pricePerUnit.value = pricePerUnit.value.substring(0, pricePerUnit.value.indexOf('.'))
        }
        pricePerUnitPretty.value = pricePerUnit.value;
        if (pricePerUnitPretty.value.indexOf('.') > -1) {
            pricePerUnitPretty.value = pricePerUnitPretty.value.replace('.', ',');
        }

        // makes price per unit rounded if dps are 00
        var pricePerUnitPretty_split = pricePerUnitPretty.value.split(",");
        if ( pricePerUnitPretty_split[1] == "00" ) {
            pricePerUnitPretty.value = pricePerUnitPretty_split[0];
        }

        var days = Math.floor(UserTimeObservables.durationSmokeFreeDays.value);

        var day_single = " dag";
        var day_multiple = " dager";
        if (days < 1) {
            days = Math.floor(UserTimeObservables.durationSmokeFreeHours.value);
            day_single = " time";
            day_multiple = " timer";
            if (days < 1) {
                days = Math.floor(UserTimeObservables.durationSmokeFreeMins.value);
                day_single = " minutt";
                day_multiple = " minutter";
            }
        }
        if ( days == 1 ) {
            dayspassed.value = days + day_single;
        } else {
            dayspassed.value = days + day_multiple;
        }


        var moneySaved2dp = Math.round((UserTimeObservables.cigSaved.value + 0.00001) * 100) / 100;
        moneySavedChosen.value = moneySaved2dp;

    } else {
        type.value = "snus";
        pricePerUnit.value = userData["pricePerSnus"].value.NameEn;
        if (pricePerUnit.value.substring(pricePerUnit.value.indexOf('.')+1) == '00') {
            pricePerUnit.value = pricePerUnit.value.substring(0, pricePerUnit.value.indexOf('.'))
        }
        pricePerUnitPretty.value = pricePerUnit.value;
        if (pricePerUnitPretty.value.indexOf('.') > -1) {
            pricePerUnitPretty.value = pricePerUnitPretty.value.replace('.', ',');
        }

        var days = Math.floor(UserTimeObservables.durationSnusFreeDays.value);
        var day_single = " dag";
        var day_multiple = " dager";
        if (days < 1) {
            days = Math.floor(UserTimeObservables.durationSnusFreeHours.value);
            day_single = " time";
            day_multiple = " timer";
            if (days < 1) {
                days = Math.floor(UserTimeObservables.durationSnusFreeMins.value);
                day_single = " minutt";
                day_multiple = " minutter";
            }
        }
        if ( days == 1 ) {
            dayspassed.value = days + day_single;
        } else {
            dayspassed.value = days + day_multiple;
        }

        var moneySaved2dp = Math.round((UserTimeObservables.snusSaved.value + 0.00001) * 100) / 100;
        moneySavedChosen.value = moneySaved2dp;
    }

    var moneyPretty = moneySavedChosen.value;
    var moneyPrettyString = moneyPretty.toString();
    if (moneyPrettyString.indexOf('.') > -1) {
        moneySavedChosenPretty.value = moneyPrettyString.replace('.', ',');
    } else {
        moneySavedChosenPretty.value = moneyPrettyString;
    }
}

// this function gets the randomised featured poison fact for the page
function getFeaturedPoisonFact() {
    if (isSmoke.value == true) {
        myData = smoking_ingredients;
    } else {
        myData = snus_ingredients;
    }
    var myDictKey = get_single_key(myData);
    featuredPoisonTitle.value = myDictKey;
    featuredPoisonFact.value = get_single_string(myData[myDictKey]);
    if (isSmoke.value == true) {
        featuredPoisonImage.value = "Assets/DetailsPage/placeholder.png";
     } else {
        featuredPoisonImage.value = snus_ingredients_images[myDictKey][0];
    }
};


// this function returns a paragraph or three of health information
function getHealthInfo() {
    healthInfo.value = null;
    if (isSmoke.value == true) {
        var myDict = smoking_health_facts;
        healthInfo.add({ info: get_single_string(myDict) });
        healthInfo.add({ info: get_single_string(myDict) });
        healthInfo.add({ info: get_single_string(myDict) });
    } else {
        var myDict = snus_health_facts;
        healthInfo.add({ info: get_single_string(myDict) });
    }
}

// this function returns the string that matches the highest value below moneysaved
function getRewards(){
    var highestLow = 0;
    for (var key in okonomi["rewards"]) {
        if ((parseInt(key) <= moneySavedChosen.value) && (parseInt(key) > highestLow ) ) {
            highestLow = parseInt(key);
        }
    }
    reward1.value = okonomi["rewards"][highestLow.toString()][0];
    reward2.value = okonomi["rewards"][highestLow.toString()][1];
    reward3.value = okonomi["rewards"][highestLow.toString()][2];
}

// this function gets the featured økonomi fact based on the highest value below moneysaved
function getFeaturedOkonomiFact() {
    var highestLow = 0;
    for (var key in okonomi["facts"]) {
        if ((parseInt(key) <= moneySavedChosen.value) && (parseInt(key) > highestLow ) ) {
            highestLow = parseInt(key);
        }
    }
    featuredOkonomiFact.value = okonomi["facts"][highestLow.toString()];
}

function calculateNotes() {

    notes.value = null;
    coins.value = null;

    var m = moneySavedChosen.value;

    var amountOfThousands = Math.floor(m/1000);
    for (i=0;i<amountOfThousands;i++) {
        notes.add({ link: "Assets/DetailsPage/money_kroner_1000.png" });
    }
    m -= amountOfThousands*1000;

    var amountOfFiveHundreds = Math.floor(m/500);
    for (i=0;i<amountOfFiveHundreds;i++) {
        notes.add({ link: "Assets/DetailsPage/money_kroner_500.png" });
    }
    m -= amountOfFiveHundreds*500;

    var amountOfTwoHundreds = Math.floor(m/200);
    for (i=0;i<amountOfTwoHundreds;i++) {
        notes.add({ link: "Assets/DetailsPage/money_kroner_200.png" });
    }
    m -= amountOfTwoHundreds*200;

    var amountOfOneHundred = Math.floor(m/100);
    for (i=0;i<amountOfOneHundred;i++) {
        notes.add({ link: "Assets/DetailsPage/money_kroner_100.png" });
    }
    m -= amountOfOneHundred*100;

    var amountOfFifty = Math.floor(m/50);
    for (i=0;i<amountOfFifty;i++) {
        notes.add({ link: "Assets/DetailsPage/money_kroner_50.png" });
    }
    m -= amountOfFifty*50;

    var amountOfTwenty = Math.floor(m/20);
    for (i=0;i<amountOfTwenty;i++) {
        coins.add({ link: "Assets/DetailsPage/money_kroner_20.jpg" });
    }
    m -= amountOfTwenty*20;

    var amountOfTen = Math.floor(m/10);
    for (i=0;i<amountOfTen;i++) {
        coins.add({ link: "Assets/DetailsPage/money_kroner_10.jpg" });
    }
    m -= amountOfTen*10;

    var amountOfFive = Math.floor(m/5);
    for (i=0;i<amountOfFive;i++) {
        coins.add({ link: "Assets/DetailsPage/money_kroner_5.jpg" });
    }
    m -= amountOfFive*5;

    var amountOfOne = Math.floor(m/1);
    for (i=0;i<amountOfOne;i++) {
        coins.add({ link: "Assets/DetailsPage/money_kroner_1.jpg" });
    }
    m -= amountOfOne*1;
}


module.exports = {
    moneySavedChosen: moneySavedChosen,
    moneySavedChosenPretty: moneySavedChosenPretty,
    pricePerUnit: pricePerUnit,
    pricePerUnitPretty: pricePerUnitPretty,
    isSmoke: isSmoke,
    type: type,
    populateValuesForChosen: populateValuesForChosen,
    dayspassed: dayspassed,
    getFeaturedPoisonFact: getFeaturedPoisonFact,
    featuredPoisonTitle: featuredPoisonTitle,
    featuredPoisonImage: featuredPoisonImage,
    featuredPoisonFact: featuredPoisonFact,
    getHealthInfo: getHealthInfo,
    healthInfo: healthInfo,

    getRewards: getRewards,
    reward1: reward1,
    reward2: reward2,
    reward3: reward3,
    getFeaturedOkonomiFact: getFeaturedOkonomiFact,
    featuredOkonomiFact: featuredOkonomiFact,

    notes: notes,
    coins: coins,
    calculateNotes: calculateNotes,

    // moreThanZero: moreThanZero
}
