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
                "Update an employees Role?",
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
                if (err) throw err;
                console.log("Employee successfully added!")

            }
        )
    }).then(function(){
        start();
    })
};

//add a role//
function addRole(){

    //prompt for role details//
   inquirer.prompt([
       {
           type: "input",
           name: "role",
           message: "Please enter a job title."
       },
       {
           type: "input",
           name: "salary",
           message: "Please enter a salary for this job title. $"
       },
       {
           type: "input",
           name: "jobid",
           message: "Please enter an ID for this job."
       }
    ]).then(function(answer){
        //add role to table
       connection.query("INSERT INTO job SET ?", {
           title: answer.role,
           salary: answer.salary,
           department_id: answer.jobid
       }, function(err){
           if (err) throw err;
           console.log("Role successfully added!")
           
       })
       
   }).then(function(){
    start();
   })
  
};


//add a department//
function addDepartment(){
    //prompt for department info//
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "Please enter a department name."
    })

    .then(function(answer){
        //set department in database//
        connection.query("INSERT INTO department SET ? ", 
        {
            name: answer.department
        }, function(err){
            if(err)throw err;
            console.log("department successfully added!")
        })
    })

    .then(function(){
        start();
    })
    
};
// updateRole(){
// //     start();
// // };

// deleteEmployee(){
//     start();
// };




function afterConnection() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if(err) throw err;
        let employeeArray= [];
        for(let i = 0; i <res.length; i++){
            employeeArray.push(res[i].first_name.last_name)
        }

        console.log(res);
        connection.end();
    });
}

