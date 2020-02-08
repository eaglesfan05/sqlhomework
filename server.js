var mysql = require("mysql");

var inquirer = require("inquirer");
//connect to sql database//
var connection = mysql.createConnection({
    host: "localhost",
  
    port: 8080,

    user: "root",
    password: "root",
    database: "work_db"
});
/*
for some reason when the if statement isnt commented out it breaks code
*/
connection.connect(function(err){
    console.log("connected");
    // if (err) throw err;
    
    // console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection(){
    connection.query("SELECT * FROM department", function(err, res){
        // if(err) throw err;
        console.log(res);
        connection.end();
    });
}

