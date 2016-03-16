pg = require('pg').native;
util = require('util');
chai = require('chai');
pgConfig = {};
dbTests = require("./dbTests");
path = require('path');

var express = require("express");
var app = express();

console.log("## LOG : Environnement = " + process.env.NODE_ENV);

var server_port = 0;
var server_ip = "";

if (process.env.OPENSHIFT_NODEJS_PORT) {
    // openshift hosting
    server_port = process.env.OPENSHIFT_NODEJS_PORT;
    server_ip = process.env.OPENSHIFT_NODEJS_IP;
    pgConfig = {
        user: process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME,
        host: process.env.OPENSHIFT_POSTGRESQL_DB_HOST,
        database: process.env.OPENSHIFT_APP_NAME,
        password: process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD,
        port: process.env.OPENSHIFT_POSTGRESQL_DB_PORT
    };
} else if (process.env.IS_CLEVERCLOUD) {
    // CleverCloud hosting
    server_port = process.env.PORT;
    server_ip = '0.0.0.0';
    pgConfig = {
        user: process.env.POSTGRESQL_ADDON_USER,
        host: process.env.POSTGRESQL_ADDON_HOST,
        database: process.env.POSTGRESQL_ADDON_DB,
        password: process.env.POSTGRESQL_ADDON_PASSWORD,
        // parsé car la variable d'env. est une chaine, et on teste si c'est un entier dans dbManager
        port: parseInt(process.env.POSTGRESQL_ADDON_PORT, 10),
    };
} else {
    // local
    server_port = 8080;
    server_ip = '127.0.0.1';
    pgConfig = {
        user: "postgres",
        host: "localhost",
        database: "rmweb3",
        password: "admin",
        port: 5432
    };
}

// -------------------- RESSOURCES EXTERNES POUR LE CLIENT --------------------

// __dirname donne le répertoire dans lequel s'exécute ce script

// il faut déclarer tous les répertoires dans lesquels on chargera des ressources

//app.use("/client", express.static(path.join(__dirname, '/client')));
// il faut même déclarer le répertoire où se trouve le présent fichier (càd __dirname) si l'on veut charger d'autres
// ressources qui y sont localisées
app.use("/", express.static(__dirname));
app.use("/webapp/xxxfolder", express.static(path.join(__dirname, 'webapp/xxxfolder')));


// -------------------- GESTION DES ROUTES --------------------

app.get('/', function(req, res) {

    console.log("route / : connexion au server node réussie");
    console.log(process.versions);
    var s = "route / : connexion au server node réussie<br>";

    s += "Versions :<br>";
    s += " :" + JSON.stringify(process.versions) + "<br>";

    s += "<br><br>";
    s += "Routes de tests :<br>";
    s += "/connect pour tester la connexion à pg<br>";
    s += "/testdb pour tester insert, update et select sur la base pg<br>";

    res.send(s);
});

app.get('/main', function(req, res) {

    res.send(s);
});

app.get('/connect', function(req, res) {

    pg.connect(pgConfig, function(err, client, done) {
        if (err) {
            return res.send("could not connect to postgres :\n" + util.inspect(err) + "\n" + util.inspect(pgConfig));
        }

        console.log("route /connect : Connexion PG réussie");
        res.send('route /connect : Connexion Pg réussie.');
        done();

    });

});

app.get('/testdb', function(req, res) {

    var cb = function(err, sResult) {
        console.log("route/testdb : résultat des tests db : \n" + sResult);
        console.log("Contenu de errr :");
        console.log(err);

        var s = "route/testdb : résultat des tests db <br>";
        s += sResult;

        if (err) {
            s += "Erreur rencontrée : <br>";
            s += JSON.stringify(err) + "<br>";
        }

        res.send(s);

    };

    dbTests.test(cb);

});

app.listen(server_port, server_ip);