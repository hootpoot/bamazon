var inquirer = require("inquirer");

var mysql = require("mysql");

var connection;
var products = "";



function listProducts( )
{

}

function afterConnection() {
    var totalCharge = 0;

    connection.query(`SELECT * FROM products;`, function (err, res) {
        if (err) throw err;
        console.log( '\n\n  List of products\n------------------------------' );
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
                            updateTable();
                            totalCharge += (cart.price * itemQuant);
                        } else {
                            console.log("Insufficient Quantity");
                        }

                        function updateTable() {
                            var change = (cart.stock_quantity - itemQuant);
                            
                            var query = connection.query(
                                `UPDATE products SET ? WHERE ?`,
                                [{ stock_quantity: change }, { id: cart.id }],
                                function (err, res) {
                                    //console.log(res.affectedRows + " products updated!\n");
                                    
                                    console.log("Total Price: $" + totalCharge.toFixed(2));
                                    console.log("------------------------------------------------------------");
                                    // Call deleteProduct AFTER the UPDATE completes
                                    //deleteProduct();
                                    finishConnection();

                                    
                                }
                            );
                                
                        }
                    });
                };

            });

        };


//        connection.end();

    });
};


function startConnection()
{
    connection = mysql.createConnection({
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
        
        afterConnection();
    });
}

function finishConnection()
{
    connection.end();
    startConnection();
}

startConnection();