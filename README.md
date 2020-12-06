# Prosjekt 3

Michelindatabase er en side for å søke i alle restaurantene som fikk michelin stjerne i 2019. 
Det er mulighet for å filtrere på et utvalg regioner, de mest kjente mat-kategoriene, og prisklasse. 
I tillegg kan man sortere på navn (A-W), pris fra billigst til dyrest, og antall stjerner. 
Det er kun 20 restauranter som vises om gangen, resten kan man se ved å bla i sidene. 
For å se mer informasjon om restauranten kan man klikke på restaurant-navnet til restauranten. 
Man kommer da til restaurantens side der man kan se mer informasjon om restauranten, og har mulighet til å legge ved kommentarer til hver restaurant. 

# Hvordan kjøre prosjektet

## Klone prosjektet

Åpne et tomt prosjekt i programmet du ønsker å kjøre prosjektet fra (F.eks. Visual Studio Code)

Åpne en terminal i denne mappen og skriv:

    git clone https://gitlab.stud.idi.ntnu.no/it2810-h20/team-41/prosjekt-3.git
    cd prosjekt-3



Nå må du kjøre både frontend og backend i hver sin terminal for å starte prosjektet

NB: For å kjøre prosjektet må du være koblet til NTNU nettet (evt. via vpn)    

## Kjøre Frontend

    cd client
    npm install
    npm start

## Kjøre Backend

    cd backend
    npm install
    nodemon server

Du kan nå åpne prosjektet på:

http://localhost:3000/


# Frontend/design
Vi har brukt Materialize CSS til styling av nettsiden som er et responsivt CSS bibliotek. 
Etter å ha testet tre forskjellige tredjeparts komponenter for styling av nettsiden, valgte vi Materialize CSS fordi det var enkelt å bruke, hadde elegant design, og fungerte godt for responsivt design. 
I tillegg har vi brukt flex-box og media queries på et par komponenter for å gjøre de mer responsive. 
Det er ikke laget en egen løsning for mobil da det ikke var krav for dette prosjektet og ville krevd ny løsning for filtermenyen.

# Teknologier

## Stack

Vi valgte å benytte oss av MERN stacken. Vi ønsket å benytte oss av en NoSQL database(se database under). Express er et rammeverk fra Node som gjør
det enkelt å bygge ut APIer uten å skrive mye kode. React er en veldokumentert biblioteket som gjør det enkelt å bygge ut web-komponenter uten mye
komplikasjoner ved håndtering av staten. 


## Redux

Vi valgte å bruke Redux til state management, selv om MobX kanskje hadde passet bedre for et lite prosjekt som dette. Dette er fordi Redux er laget for å 
håndtere state for større prosjekter, og brukes dermed mer av større selskaper. Redux virket derfor som mer relevant å lære for oss og det vi ville få størst 
utbytte av å kunne i ettertid. I tillegg har Redux bedre dokumentasjon, og det gjør det enklere å finne løsninger på problemer underveis. Vi valgte å strukturere 
Redux filene våre ved bruk av "ducks" pattern, som innebærer å samle all logikken til en state i en “duck”. Denne inneholder da alt av types, actions, reducers og 
action creators for denne staten. Oversikt over “ducks” brukt i prosjektet:

**commentDuck:** Styrer logikken for å lagre en ny kommentar i databasen.

**counterDuck:** Gir ut et tall på hvor mange restauranter i databasen som passer med søk og filter, for å hele tiden har riktig antall sider med restauranter å bla mellom.

**cuisineFilterDuck:** Har kontroll på hvilke cuisiner som brukeren har krysset av for at skal vises.

**priceFilterDuck:** Har kontroll på hvilke priskategorier som brukeren har krysset av for at skal vises.

**regionFilterDuck:** Har kontroll på hvilke regioner som brukeren har krysset av for at skal vises.

**restaurantDuck:** Styrer all logikken for henting av restauranter fra databasen basert på de ulike valgene brukeren kan gjøre. (Filter, søk, sortering, bla mellom sider for å få opp flere resultater)

**searchDuck:** Holder kontroll på hva som er skrevet inn i søkefeltet.

**skipDuck:** Holder kontroll på hvor mange restauranter som skal skippes i backend etter hvilken Pagination knapp brukeren trykker på.

**sortingDuck:** Holder kontroll på hvilken parameter brukeren har valgt å sortere resultatene på, default er navn.




## Backend

Vi installerte en MongoDB database på virtuell maskin (NTNU server) med data om alle Michelin-restauranter fra 2019. Vi ønsket å gi inntrykket av en informativ
nettside til fordel for et forum for å diskutere hvor godt omdømme restaurantene har. Med dette i bakhodet så vi ikke behovet for å implementere muligheten for
å generere en personlig profil med f.eks. rating-funksjonalitet, ettersom restaurantene allerede har et profesjonelt omdømme. Vi implementerte et REST API med
Node.js og Express sammen med mongoose (for Mongodb objekt modellering).
Vi har implementerte tre endepunkt: 

    GET: http://localhost:8000/api/restaurant/filter/ 

Henter all data om opptil 20 restauranter. Brukes til sortering etter enten navn, pris eller antall Michelin-stjerner. Brukes til filtrering etter søk av navn på
restaurant og/eller pris/region/kjøkken.

    PUT: http://localhost:8000/api/restaurant/comment/:restaurant_id

Kommenterer på restauranten med oppgitt id i parameteren.

    GET: http://localhost:8000/api/counter/

Brukes for å bestemme hvor mange restauranter som passer til oppgitt filter. Dette tillater applikasjonen til å holde styr på antall sider med restauranter som må defineres.

Første endepunkt sørger for å hente all data basert på oppgitt filter. Dette kunne i teorien blitt skilt ut som flere endepunkter men vi vurderte at det vil være enklere å hente
ut den filtrert dataen gjennom ett endepunkt. Et viktig poeng er også at nytteverdien med å skape flere endepunkt for mer spesifikk uthenting av data var neglisjerbar. 

Vi valgte å definere et endepunkt for å gi kommentarer på en restaurant. Ved hjelp av restauranten sin objekt-id, er det enkelt å lokalisere riktig restaurant i databasen for
så å legge til ønsket kommentar i restauranten sin array med kommentarer.

Vi valgte å skille ut tredje endepunkt for å registrere hvor mange restauranter som passer oppgitt filter. Dette kunne i teorien blitt gjort gjennom første endepunkt.
Likevel er det ikke alltid er nødvendig å gjennomføre dette kallet hver gang første endepunkt kalles (f.eks. ved å bevege seg til neste side med restauranter).
Vi valgte derfor å definere dette som et eget endepunkt. 

Vi har valgt å benytte oss av REST api ettersom det er lett å skalere opp uten omfattende omstrukturering av prosjektet. REST apier er veldig fleksible og gjør det
lettere å behandle og ta imot data med ulikt format.


## Database

MongoDB er en noSQL database. Vi valgte å benytte oss av Mongodb til fordel for en relasjonsdatabase ettersom NoSQL databaser tilbyr mye frihet med hvordan
dataene kan struktureres og lagres. Vi var avhengig av at restaurant-objektene kunne holde på store mengder data f.eks. et array av kommentarer.
Mongoose er i tillegg en fantastisk nyttig modul fra Node som gjør det enkelt lagre, hente, endre og prosessere data.

# Testing

## Systematisk enhetstesting
Vi har brukt Jest og enzym til systematisk enhetstesting for å teste at de viktigste komponentene i React applikasjonen vår skrives ut på riktig måte. 
I tillegg har vi forsøkt å teste at man får forventet output når man sender mockdata inn i comment-komponenten. 
Resten av komponentene har vi testet oppførselen til med end-to-end testing i cypress, og har derfor valgt å ikke prioritere tid til å teste dette igjen med enhetstester. 
Enhetstestene vi har laget er for MainPage, StartPage, og Reviews. 

![Enhetstester](unit-testing.PNG "Enhetstesting")

**Hvordan kjøre testene**

For å kjøre testene må du først kjøre både backend og frontend. Hvordan du gjør dette er beskrevet lengre opp.

Deretter skriver du i terminalen: 

    cd client
    npm test


## Automatisert end-to-end testing

Vi har valgt å bruke Cypress til end-to-end testene, siden det ble anbefalt. Vi har 4 end-to-end tester som tester ulik funksjonalitet på nettsiden. 
Vi har en som tester filtreringen vår ved å trykke på et filter og sjekke at de resultatene som dukker opp på nettsiden er riktig. Vi har en test for søking som skriver 
inn et restaurant navn i søkefeltet og sjekker at det kun kommer opp ett resultat på nettsiden, og at dette resultatet stemmer med navnet vi søkte på. Vi har en test 
som tester sorteringen av resultatene ved å trykke på en ny sortering og sjekke at restaurantene som dukker opp er riktig og i riktig rekkefølge. I tillegg har vi en 
end-to-end test som tester hovedsiden vår, mainPage. Denne sjekker at alle komponentene som skal ligge på denne siden er synlige, og at det kommer opp riktig antall 
knapper for sortering og filtrering med riktig navn. 


![End to End testing](end-2-end.PNG "End-to-End testing")



**Hvordan kjøre testene**

For å kjøre testene må du først kjøre både backend og frontend. Hvordan du gjør dette er beskrevet lengre opp.

Deretter skriver du i terminalen: 

    cd client
    npm run cypress
