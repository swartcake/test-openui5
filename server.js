var express = require("express");
var pg = require('pg');
var util = require('util');
var path = require('path');
var fs = require('fs');

var compression = require('compression');

var pgConfig = {};


// --------------------------------------------------------------
// ------------- CONFIGURATION DU MIDDLEWARE EXPRESS ------------
// --------------------------------------------------------------
// 
var app = express();
app.use(compression()); //Performance - we tell express to use Gzip compression


// -------------------- RESSOURCES EXTERNES POUR LE CLIENT --------------------
app.use("/", express.static(__dirname));
app.use("/webapp", express.static(path.join(__dirname, '/webapp')));
app.use("/sdk/openui5-sdk-1.36.4/resources", express.static(path.join(__dirname, '/sdk/openui5-sdk-1.36.4/resources')));

console.log("## LOG : Environnement = " + process.env.NODE_ENV);

var server_port = 0;
var server_ip = "";

if (process.env.IS_CLEVERCLOUD) {
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

app.get('/', function(req, res) {

    console.log("route / : connexion au server node réussie");
    console.log(process.versions);	var s = "route / : connexion au server node réussie<br>";

	s +="Versions :<br>";
	s +=" :"+JSON.stringify(process.versions)+"<br>";
    res.send(s);
});

app.get('/main', function(req, res) {

    console.log("route /main : connexion au server node réussie");

    res.send(fs.readFileSync(__dirname+'/webapp/index.html','utf8'));

});


app.get('/connect', function(req, res) {

    pg.connect(pgConfig, function(err, client, done) {
        if (err) {
            return res.send("could not connect to postgres :\n" + util.inspect(err) + "\n" + util.inspect(pgConfig));
        }

        console.log("route /connect : Connexion PG réussie");
        res.send('Connexion Pg réussie.');
        done();

    });

});

app.listen(server_port, server_ip);