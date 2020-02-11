var mysql = require("mysql");

var inquirer = require("inquirer");
//connect to sql database//
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

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
    if (err) throw err;
    console.log("connected as id " + connection.threadId);


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
                "Update an employee's role?",
                "View all employees.",
                "Delete an employee?"
            ]
        }

    ).then(function (answer) {
        // if(answer.choice === "Add an employee?"){
        //     addEmployee();
        // }else if(answer.choice === "Delete an employee?"){
        //     deleteEmployee();
        // }else{
        // //     connection.end();
        // }

        switch (answer.choice) {
            case "Add an employee?":
                addEmployee();
                break;

            case "Add a role?":
                addRole();
                break;

            case "Add a department?":
                addDepartment();
                break;

            case "Update an employee's role?":
                updateRole();
                break;

            case "Delete an Employee?":
                deleteEmployee();

            case "View all employees.":
                afterConnection();
                break;

            default:
                connection.end();
                break;

        }
    });

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
            type: "list",
            name: "role_id",
            message: "What is this employee's role?",
            choices: [
                "Sales",
                "Marketing",
                "Manager",
                "Engineer"
            ]
        },        
        {
            type: "list",
            name: "manager_id",
            message: "What is this employee's manager name?",
            choices: [
                "bob",
                "larry"
            ]

        }        
    ]).then(res => {
        console.table(res.firstname)
        return (res);
    }).then(res =>{
        var query = connection.query("INSERT INTO employee SET ?", {
            first_name: res.firstname,
            last_name: res.lastname,
            role_id: res.role_id,
            manager_id: res.manager_id
        }, function (err){
            if (err) throw err;
            console.log("Added")
        })
        console.log(query.sql);
    }).then(function () {
        start();
    })        
};

//add a role//
function addRole() {

    //prompt for role details//
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Please enter a job title.",
            choices: [
                "Salesman",
                "Marketing Director",
                "Manager",
                "Head Engineer"
            ]
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter a salary for this job title. $"
        },
        {
            type: "list",
            name: "jobid",
            message: "Please assign this job a department.",
            choices: [
                "Sales",
                "Marketing",
                "Management",
                "Engineering"
            ]
        }
    ]).then(res =>{
        return (res);
    }).then(function (res) {
        //add role to table
        var query = connection.query("INSERT INTO job SET ?", {
            title: res.role,
            salary: res.salary,
            department_id: res.jobid
        }, function (err) {
            if (err) throw err;
            console.log("Role successfully added!")

        })
        console.log(query.sql)
    }).then(function () {
        start();
    })

};


//add a department//
function addDepartment() {
    //prompt for department info//
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "Please enter a department name."
    })

        .then(function (answer) {
            //set department in database//
            connection.query("INSERT INTO department SET ? ",
                {
                    name: answer.department
                }, function (err) {
                    if (err) throw err;
                    console.log("department successfully added!")
                })
        })

        .then(function () {
            start();
        })

};


function updateRole() {
    var query = connection.query("UPDATE job SET ? WHERE ?", [
        {
            department_id: 6
        },
        {
            title: "sales"
        }
    ], function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + "Role updated");

        start();
    })
    console.log(query.sql);
};

// deleteEmployee(){
//     start();
// };



//view employees figure out inner join//
function afterConnection() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        let employeeArray = [];
        for (let i = 0; i < res.length; i++) {
            console.log("First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || Job Title: " + res[i].role_id + " || Manager Name: " + res[i].manager_id);
        }
        start();
    });
}
