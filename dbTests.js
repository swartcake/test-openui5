var ClientSync = require('pg-native');

var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

var sSQL_CREATE = "DROP TABLE IF EXISTS t_test_tst;";
sSQL_CREATE += "CREATE TABLE t_test_tst ( ";
sSQL_CREATE += " tst_lib character varying(20) ";
sSQL_CREATE += ");";

var sSQL_INSERT = "";

for (var i = 0; i < 50; i++) {
	sSQL_INSERT += "INSERT INTO t_test_tst VALUES ('" + chance.word({
		length: 5
	}) + "') ;";
}

sSQL_INSERT += "INSERT INTO t_test_tst VALUES ('toto') ;";

var sSQL_SELECT = "SELECT t_test_tst.tst_lib FROM t_test_tst WHERE t_test_tst.tst_lib = 'toto' ;";

var sSQL_UPDATE = "UPDATE t_test_tst SET tst_lib = 'titi' WHERE t_test_tst.tst_lib = 'toto' ;";

var sSQL_DELETE = "DELETE FROM t_test_tst WHERE t_test_tst.tst_lib = 'titi' ;";

function test(cb) {


	pg.connect(pgConfig, function(err, client, done) {

		if (err) {
			return cb(err);
		}

		testCreateTable(client, done, cb, "Connection réussie <br>");

	});

}


function testCreateTable(client, done, cb, sResult) {

	client.query(sSQL_CREATE, function(err, result) {

		done();

		if (err) {
			sResult += "Erreur dans la requete SQL :<br>";
			sResult += sSQL_CREATE + "<br>";
			return cb(err, sResult);
		}

		chai.expect(result, "result devrait exister").to.exist.and.be.an('object');

		testInsert(client, done, cb, sResult + "Test CREATE réussi <br>");

	});

}

function testInsert(client, done, cb, sResult) {

	client.query(sSQL_INSERT, function(err, result) {

		if (err) {
			done();
			sResult += "Erreur dans la requete SQL :<br>";
			sResult += sSQL_INSERT + "<br>";
			return cb(err, sResult);
		}

		chai.expect(result, "result devrait exister").to.exist.and.be.an('object');

		testSelect(client, done, cb, sResult + "Test INSERT réussi <br>");

	});

}

function testSelect(client, done, cb, sResult) {

	client.query(sSQL_SELECT, function(err, result) {

		if (err) {
			done();
			sResult += "Erreur dans la requete SQL :<br>";
			sResult += sSQL_SELECT + "<br>";
			return cb(err, sResult);
		}

		chai.expect(result, "result devrait exister").to.exist.and.be.an('object');
		chai.expect(result.rows, "result.rows devrait exister et être un tableau de 1").to.exist.and.be.an('array').and.have.length(1);
		chai.expect(result.rows[0].tst_lib, "result.rows[0] devrait exister et être une chaine égale à 'toto'").to.exist.and.be.a('string').and.equal('toto');

		testUpdate(client, done, cb, sResult + "Test SELECT réussi <br>");

	});

}

function testUpdate(client, done, cb, sResult) {

	client.query(sSQL_UPDATE, function(err, result) {

		if (err) {
			done();
			sResult += "Erreur dans la requete SQL :<br>";
			sResult += sSQL_UPDATE + "<br>";
			return cb(err, sResult);
		}

		chai.expect(result, "result devrait exister").to.exist.and.be.an('object');
		//chai.expect(result.rows, "result.rows devrait exister et être un tableau de 1").to.exist.and.be.an('array').and.have.length(1);

		testDelete(client, done, cb, sResult + "Test UPDATE réussi <br>");

	});

}

function testDelete(client, done, cb, sResult) {

	client.query(sSQL_DELETE, function(err, result) {

		if (err) {
			done();
			sResult += "Erreur dans la requete SQL :<br>";
			sResult += sSQL_DELETE + "<br>";
			return cb(err, sResult);
		}

		chai.expect(result, "result devrait exister").to.exist.and.be.an('object');
		//chai.expect(result.rows, "result.rows devrait exister et être un tableau de 1").to.exist.and.be.an('array').and.have.length(1);

		testSync(client, done, cb, sResult + "Test DELETE réussi <br>");

	});

}

function testSync(client, done, cb, result) {

	var clientSync = new ClientSync();
	clientSync.connectSync(pgConfig);

	var rows;

	//text queries
	rows = clientSync.querySync('SELECT NOW() AS the_date');
	console.log(rows[0].the_date); //Tue Sep 16 2014 23:42:39 GMT-0400 (EDT)

	//parameterized queries
	rows = clientSync.querySync('SELECT $1::text as twitter_handle', ['@test']);
	console.log(rows[0].twitter_handle); //@test

	//prepared statements
	clientSync.prepareSync('get_twitter', 'SELECT $1::text as twitter_handle', 1);

	rows = clientSync.executeSync('get_twitter', ['@test']);
	console.log(rows[0].twitter_handle); //@test

	rows = clientSync.executeSync('get_twitter', ['@realcarrotfacts']);
	console.log(rows[0].twitter_handle); //@realcarrotfacts

	endTest(done, cb, sResult + "Test NATIVE SYNC réussi <br>");

}

function endTest(done, cb, sResult) {

	done();

	cb(null, sResult);


}

// ------------------ EXPORT FUNCTIONS ----------------
exports.test = test;