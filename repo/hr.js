const db = require('../config/database');

let hrReimbursement = {
    // US009
    viewReimbursementList: (resolve) => { 
        let sql = `SELECT 
            flex_reimbursement.transaction_number, 
            employees.employee_number, 
            CONCAT(employees.lastname, ', ', employees.firstname) AS employee_name, 
            flex_reimbursement_details.amount AS amount_to_be_reimbursed, 
            flex_reimbursement.date_submitted, 
            flex_reimbursement.status

        FROM flex_reimbursement_details
            INNER JOIN flex_reimbursement ON flex_reimbursement_details.flex_reimbursement_id = flex_reimbursement.flex_reimbursement_id
            INNER JOIN employees ON flex_reimbursement.employee_id = employees.employee_id
            INNER JOIN flex_cycle_cutoffs ON flex_reimbursement.flex_cutoff_id = flex_cycle_cutoffs.flex_cutoff_id
        
        WHERE 
            flex_cycle_cutoffs.flex_cutoff_id <= 3 AND 
            flex_cycle_cutoffs.is_active = true
            ORDER BY flex_reimbursement_details.status DESC`;

        db.query(sql, (err, data) => {
            if(err){
                throw(err);
            }
            resolve(data);
        });
    },

    // US010
    viewReimbursementDetails: (resolve) => {
        let sql = `SELECT 
            employees.employee_number, 
            CONCAT(employees.lastname, ', ', employees.firstname) AS employee_name, 
            flex_reimbursement.date_submitted, 
            flex_reimbursement_details.date_added, 
            flex_reimbursement_details.or_number, 
            flex_reimbursement_details.name_of_establishment, 
            flex_reimbursement_details.tin_of_establishment, 
            flex_reimbursement_details.amount, categories.name, 
            flex_reimbursement.total_reimbursement_amount, 
            flex_reimbursement.transaction_number, 
            flex_reimbursement.status

        FROM flex_reimbursement_details

            INNER JOIN flex_reimbursement ON flex_reimbursement_details.flex_reimbursement_id = flex_reimbursement.flex_reimbursement_id
            INNER JOIN categories ON flex_reimbursement_details.category_id = categories.category_id
            INNER JOIN employees ON flex_reimbursement.employee_id = employees.employee_id;`;

        db.query(sql, (err, data) => {
            if(err){
                throw (err)
            }
            resolve(data)
        });
    },

    // US011
    searchReimbursement: (search, resolve) => {
        let sql = `SELECT 
            employees.employee_number, 
            CONCAT(employees.lastname, ', ', employees.firstname) AS employee_name, 
            flex_reimbursement.date_submitted, 
            flex_reimbursement_details.date_added, 
            flex_reimbursement_details.or_number, 
            flex_reimbursement_details.name_of_establishment, 
            flex_reimbursement_details.tin_of_establishment, 
            flex_reimbursement_details.amount, categories.name, 
            flex_reimbursement.total_reimbursement_amount, 
            flex_reimbursement.transaction_number, 
            flex_reimbursement.status

        FROM flex_reimbursement_details
            INNER JOIN flex_reimbursement ON flex_reimbursement_details.flex_reimbursement_id = flex_reimbursement.flex_reimbursement_id
            INNER JOIN categories ON flex_reimbursement_details.category_id = categories.category_id
            INNER JOIN employees ON flex_reimbursement.employee_id = employees.employee_id

        WHERE
            employees.employee_id = ? OR 
            employees.firstname LIKE ? OR 
            employees.lastname LIKE ?`;
        db.query(sql,[search.id, search.firstname, search.lastname], (err, data) => {
            if(err){
                throw(err)
            }
            resolve(data)
        })
    },

    approveReimbursement:(id, resolve) => {
        let sql = `UPDATE flex_reimbursement 
        SET status = "approved", date_updated = NOW() 
        WHERE flex_reimbursement_id = ? `;
        db.query(sql, id, (err, data) => {
            if(err){
                throw (err)
            }
            resolve(data)
        })
    }

}

module.exports = hrReimbursement;