const inquirer = require("inquirer");
const db = require("./db");
const connection = require("./db/connection")
require("console.table");



function init() {
inquirer.prompt([
  {
    type:"list",
    name:"todo",
    message:"What would you like to do?",
    choices: [
      {
        name: "View All Employees",
        value: "view_employee"
      },
      {
        name: "View All Roles",
        value: "view_roles"
      }, {
        name: "View All Departments",
        value: "view_departments"
      },
      {
        name: "Add employee",
        value: "add_employee"
      },
      {
        name: "Add role",
        value: "add_role"
      },
      {
        name: "Add department",
        value: "add_department"
      },
      {
        name: "Update an Employee Role",
        value: "update_employee_role"
      },
    ]
  }
]) .then((data) => {
  switch(data.todo){
    case "view_employee":
      viewEmployee();
      break;
    case "view_roles":
      viewRoles();
      break;
    case "view_departments":
      viewDepartments();
      break;
      case "add_department":
      addDepartment();
      break;
      case "add_role":
        addRole();
        break;
        case "add_employee":
          addEmployee();
          break;
          case "update_employee_role":
            updateEmployeeRole();
            break;
  }
})
}

init();

// main directory inquirer prompt





function viewDepartments() {
  db.findDepartments().then(([departments]) => {
    console.table(departments);
    init()
  });
}

function viewRoles() {
  db.findRole().then(([roles]) => {
    console.table(roles);
    init()
  });
}
function viewEmployee() {
  db.findEmployee().then(([employee]) => {
    console.table(employee);
    init()
  });
}
function addDepartment() {
  inquirer.prompt([

    {
      type:"input",
      name:"department",
      message:"What is the new department name?",
    }

  ]).then(data => {

connection.query("insert into department set ?", {
  name: data.department
})
init()
})}

function addRole() {
connection.query("select * from department", (req,res) => {
  inquirer.prompt([
    {
      type:"input",
      name:"title",
      message:"What is your role?",
    },
    {
      type:"input",
      name:"salary",
      message:"What is your salary",
    },
    {
      type:"list",
      name:"department_name",
      message:"What department is the Role in?",
      choices: res.map(department => department.name)
    },
  ])
  .then(data => {
    let departmentName = res.find(department => department.name === data.department_name)
    connection.query("insert into role set ?", {
      title: data.title,
      salary: data.salary, 
      department_id: departmentName.id,

    })
    init()
  })
})
}

function  addEmployee() {
  connection.query("select * from role", (req,res) => {
    inquirer.prompt([
      {
        type:"input",
        name:"first_name",
        message:"What is your first name",
      },
      {
        type:"input",
        name:"last_name",
        message:"What is your last name",
      },
      {
        type:"list",
        name:"role_title",
        message:"What title is your occupation?",
        choices: res.map(role => role.title)
      },
    ])
    .then(data => {
      let roleName = res.find(role => role.title === data.role_title)
      connection.query("insert into employee set ?", {
        first_name: data.first_name,
        last_name: data.last_name, 
        role_id: roleName.id,
      })
      init()
    })})
}
function  updateEmployeeRole() 
{
  connection.query("select * from employee", (req,res) => {
    inquirer.prompt([
      {
        type:"list",
        name:"employee",
        message:"Who is your employee?",
        choices: res.map(employee => employee.id)
      },
    ])
    .then(employeeData => {
      connection.query("select * from role", (req2,res2) => {
        inquirer.prompt([
          {
            type:"list",
            name:"role_title",
            message:"What role would you like to assign to your employee?",
            choices: res2.map(role => role.id)
          },
        ])
        .then(roleData => {
          connection.query("update employee set role_id = ? where id = ?", [roleData.role_title, employeeData.employee],(req3,res3) => {
          })
          init()
        })})
    })})
  }
