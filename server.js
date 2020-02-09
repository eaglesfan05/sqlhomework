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
connection.connect(function (err) {
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

//function to make choices//
function start() {
    inquirer.prompt(
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

    ).then(function (answer) {
            if(answer.choice === "Add an employee?"){
                addEmployee();
            }else if(answer.choice === "Delete an employee?"){
                deleteEmployee();
            }else{
                connection.end();
            }
            // switch (answer.choice) {
            //    case "Add an employee?":
            //         addEmployee();
            //         break; 

                // case "Add a role?":
                //     addRole();
                //     break;

                // case "Add a department?":
                //     addDepartment();
                //     break;

                // case "Update an employee's role?":
                //     updateRole();
                //     break;

                // case "Delete an Employee?":
                //     deleteEmployee();

                // // default:
                //     afterConnection();
                //     break;

            }
        );
    
}
//add new employee//
function addEmployee() {
    //prompt for new employee info//
    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastname",
            message: "What is the employees last name?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the role ID?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is this employee's manager ID?"

        }
    ])
    
    .then(function (answer) {
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            }, function (err) {
                console.log("Employee successfully added!")

            }
        )
    }).then(function(){
        start();
    })
// afterConnection();
    // start();
};


// addRole(){
//     start();
// };
// addDepartment(){
//     start();
// };
// updateRole(){
// //     start();
// // };

// deleteEmployee(){
//     start();
// };




function afterConnection() {
    connection.query("SELECT * FROM employee", function (err, res) {
        // if(err) throw err;
        console.log(res);
        connection.end();
    });
}

