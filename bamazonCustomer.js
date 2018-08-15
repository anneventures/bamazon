var mysql = require("mysql");

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"root",
	database:"bamazon"
});

function afterConnection() {
	connection.query("SELECT * FROM products", function(err, result, fields) {
		if(err) throw err;
		console.log(result);
		connection.end();
	});
};

connection.connect(function(err) {
	if(err) throw err;
	afterConnection();
});