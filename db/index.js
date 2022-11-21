const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findDepartments() {
    return this.connection.promise().query("select * from department");
  }
  findRole() {
    return this.connection.promise().query("select role.id, role.title, role.salary, department.name AS department from role left join department on role.department_id = department.id");
  }
  findEmployee() {
    return this.connection.promise().query("select * from employee");
  }
  addDepartment(department) {
    return this.connection.promise().query("insert into department set ?", department )
  }
}

module.exports = new DB(connection);
