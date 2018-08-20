var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"root",
	database:"bamazon"
});

connection.connect(function(err) {
	if(err) throw err;
	begin();
});

function begin() {
	connection.query("SELECT * FROM products", function(err, res) {
		if(err) throw err;
		res.forEach(row => {
			console.log(res)
		});
		questions();
	})
}


// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

function questions() {
	inquirer
	.prompt([
		{
			name: "itemID",
			type: "input",
			message: "What is the item ID of the product you'd like to buy?",
			validate: function(value) {
				if(isNaN(value) === false) {
					return true;
				}
				return false;
			} //end validate
		},
		{
			name: "units",
			type: "input",
			message: "How many units of the product do you want to buy?",
			validate: function(value) {
				if (isNaN(value) === false) {
					return true;
				}
				return false;
			}//end validate
		}
	])
	.then(function(ans) {

		var itemID = ans.itemID;
		var units = ans.units;
		condition(itemID,units)
	});
}

	function condition(itemID, units) {
		connection.query("SELECT * FROM products", function(err,res) {
				if(err) throw err;
				var item;
				for(var i = 0; i < res.length; i++) {
					if(res[i].item_id == itemID) {
						item = res[i]
					}
				}
			console.log(item, "item found")
				if(item.stock_quantity >= units) {
					orderSuccess(item, itemID, units)
					connection.end()
				} else {
					console.log("insufficient quantity")
					connection.end();
				}
		})
	};

	function orderSuccess (itemObj, itemID, units) {
		var newUnits = itemObj.stock_quantity - units;
		var itemSales = itemObj.price * units;
		var query1 = "UPDATE products SET stock_quantity = ? where ?";
		var query2 = "UPDATE products SET product_sales = ? where ?";
		connection.query(query1,[newUnits, {item_id: itemID}], function (error, res) {				
		})
		connection.query(query2, [itemSales, {item_id: itemID}], function (error, res) {				
		})
	}