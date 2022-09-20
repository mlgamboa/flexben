const reimbursement = require('../repo/employee');
const employee = require('../repo/employee');

    module.exports.addReimbursementItem = (req, res) => {
  
        let reimbursement = {
            "flex_reimbursement_id":req.body.flex_reimbursement_id,
            "date_added":req.body.date_added,
            "or_number":req.body.or_number,
            "name_of_establishment":req.body.name_of_establishment,
            "tin_of_establishment":req.body.tin_of_establishment,
            "amount":req.body.amount,
            "category_id":req.body.category_id
        }
        const min_amount = 500;
        let yearNow = new Date(Date.now());
        yearNow = new Date(Date.parse(yearNow.getFullYear()));
        let currentDate = new Date(Date.now());

        if((yearNow < reimbursement.date_added && reimbursement.date_added < currentDate)) {
            return res.status(400).json({
                message: "Invalid date"
            });
        } else if(!(req.body.amount >= min_amount)){
            return res.status(400).json({
                message: "Invalid amount"
            });
        } else if (!(req.body)) {
            return res.status(400).json({
                message: "Bad Request"
            });
        } else {
            employee.addReimbursementItem(reimbursement, (data)=> {
                return res.status(201).json({
                    message:"New reimbursement Item added",
                    data: data
                })
            })
        }
    }

    module.exports.checkIfFileReimbursementListExist = (req, res) => {
        employee.checkCutOff((data) => {
            if(!data.length){
                res.status(404).json({
                    message: "No Active Cutoff"
                })
            }
            else{
                employee.checkReimbursementList(req.params.id, (data) => {
                    if(!data.length){
                        res.status(404).json({
                            message: "No existing list. Go to http://localhost:4242/employee/reimbursement/list to create new"
                        });
                    }
                    else {
                        res.status(200).json({
                            message: "Existing list. Go to http://localhost:4242/employee/reimbursement/details to add items",
                            data: data
                        });
                    }
                });
            }
        });
    };

    module.exports.addReimbursementList = (req, res) => {
        let reimbursementList = {
            "flex_reimbursement_id":req.body.flex_reimbursement_id,
            "employee_id":req.body.employee_id,
            "flex_cutoff_id":req.body.flex_cutoff_id
        }
        employee.addReimbursementList(reimbursementList, (data) => {
            res.status(201).json({
                message:"Added new Reimbursement List, you can now add to your reimbursement details",
                data:data
            });
        });
    };

    module.exports.deleteReimbursement =  (req, res, next) => {
        employee.deleteReimbursement(req.params.id, function(data){
            if(data){
                res.status(200).json({
                    "status":200,
                    "statusText":"Deleted",
                    "message":"Successfully deleted"
                })
            }
        }, (err) => {
            next(err)
        });

    }

    module.exports.calculateFlexPoints = (req, res) => {
        const { flex_credits, monthly_rate } = req.body;
        
        if(!flex_credits || !monthly_rate)
        return res.status(400).json({
            message: "Flex Credits and Monthly rate are needed"
        });

        const flexPoints = (parseFloat(monthly_rate)/21.75 * parseFloat(flex_credits));

        res.status(200).json({
            message: "Success",
            flex_points: flexPoints
        });
    }





