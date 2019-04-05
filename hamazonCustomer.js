var inquirer = require("inquirer");

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "S!mpsons1",
    database: "hamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query(`SELECT * FROM products;`, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + "|" + res[i].product_name + "|" + res[i].department_name + "|" + res[i].price + "|" + res[i].stock_quantity);
        }
        console.log("------------------------------------------------------------");

        pickID();

        function pickID() {
            inquirer.prompt([{
                type: "input",
                name: "enterID",
                message: "Enter the ID of the item you would like to purchase."
            }]).then(function (user) {
                var itemInput = user.enterID;
                var itemIndex = (itemInput - 1);
                var cart = res[itemIndex];
                console.log("------------------------------------------------------------");

                pickQuantity();

                function pickQuantity() {
                    inquirer.prompt([{
                        type: "input",
                        name: "quantity",
                        message: "Enter quantity."
                    }]).then(function (user) {
                        var itemQuant = user.quantity;
                        console.log("------------------------------------------------------------");
                        if (itemQuant <= cart.stock_quantity) {
                            //updateTable();
                        } else {
                            console.log("Insufficient Quantity");
                        }
                        
                    });
                };

            });

        };



        connection.end();

    });
};