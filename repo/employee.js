const db = require('../config/database');

let reimbursement = {
   
    checkCutOff: (resolve) =>{
        let sql = `SELECT *
        FROM flex_cycle_cutoffs
        WHERE
            is_active = 1
        LIMIT 1`;
        db.query(sql, (err, data) => {
            if(err){
                throw (err)
            }
            resolve(data);
        })
    },
    
    checkReimbursementList: (id, resolve)=>{
        let sql = `SELECT *
        FROM flex_reimbursement
        WHERE
            employee_id = ? AND NOT status = "Submitted" `;
        db.query(sql, id, (err, data)=>{
            if(err){
                throw (err)
            }
            resolve(data);
        })
    },

    addReimbursementList: function(reimbursementList, resolve){
        let sql=`INSERT INTO flex_reimbursement
            (
                employee_id,
                flex_cutoff_id,
                total_reimbursement_amount,
                date_submitted,
                status,
                date_updated,
                transaction_number
                )
        VALUES(?,?,null,null,new,null,null)`;
        db.query(sql, [reimbursementList.employee_id, reimbursementList.flex_cutoff_id], (err, data) => {
            if(err){
                throw (err);
            }
            resolve(data);
        })
    },

    addReimbursementItem: function(reimbursement, resolve){
        let sql = `INSERT INTO flex_reimbursement_details
            (flex_reimbursement_id,
                or_number, 
                name_of_establishment, 
                tin_of_establishment, 
                amount, 
                category_id, 
                date_added,
                status)
            VALUES(?,?,?,?,?,?,?,'draft')`;
        db.query(sql, [reimbursement.flex_reimbursement_id, reimbursement.or_number, reimbursement.name_of_establishment, 
        reimbursement.tin_of_establishment, reimbursement.amount, reimbursement.category_id, reimbursement.date_added], (err, data)=>{
            console.log(sql);
            if(err){
                throw (err);
            }
            resolve(data[0]);
           
        });
    },

    deleteReimbursement: function(id, resolve){
        let sql = `DELETE FROM flex_reimbursement_details 
        WHERE flex_reimbursement_detail_id = ? AND 
        flex_reimbursement_details.status = 'draft'`;
        db.query(sql, id, (data) =>{
            if(err){
                throw(err);
            }
            resolve(data)
        });
    },

    updateReimbursementListTotalAmount: function(operator, params, resolve){
        let sql = `UPDATE flex_reimbursement 
            SET total_reimbursement_amount = total_reimbursement_amount ${operator} ${parseFloat(params.amount)}
            WHERE flex_reimbursement_id = ? AND employee_id = ?`;
            db.query(sql, [params.flex_reimbursement_id, params.employee_id], (err, data) => {
                if(err){
                    throw(err)
                }
                resolve(data);
            })
    }

   
}

module.exports = reimbursement;