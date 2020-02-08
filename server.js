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
    // if(err){
    //     console.log(err);
    // }else{
        console.log("connected as id " + connection.threadId);
    // // if (err) throw err;
    
    // // console.log("connected as id " + connection.threadId);
    // afterConnection();
    // }
    start();
});
function start(){
    inquirer.prompt([
       {
           type: "list",
           name: "choice",
           message: "What would you like to do?",
           choices: [
               "Add an employee?",
               "Add a role?",
               "Add a department?",
               "Update an employees Role?",
               "Delete an employee?"
           ] 
       }
    ])
    // .then(function(answer){

    // })
}
function afterConnection(){
    connection.query("SELECT * FROM department", function(err, res){
        // if(err) throw err;
        console.log(res);
        connection.end();
    });
}

