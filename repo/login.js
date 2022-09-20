const db = require('../config/database');

const employeeLogin = {
    findEmployee: function(employee, resolve, reject){
        let sql = `SELECT employees.employee_id, employees.firstname, employees.lastname, roles.description AS role
        FROM accounts 
            INNER JOIN employees ON accounts.employee_id = employees.employee_id
            INNER JOIN roles ON employees.role_id = roles.role_id
        WHERE
            employees.email = ? AND accounts.password = ? `;
        db.query(sql, [employee.email, employee.password], (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data)
        });
    }
};


module.exports = employeeLogin;