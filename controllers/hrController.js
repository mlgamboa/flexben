const hr = require('../repo/hr');

module.exports.viewReimbursementList = (req, res, next) => {
    hr.viewReimbursementList((data) => {
        res.status(200).json({
            message:"Reimbursement List Retrieved",
            data:data
        });
    }, (err)=>{
        next(err);
    });
};

module.exports.viewReimbursementDetails = (req, res, next) => {
    hr.viewReimbursementDetails((data) => {
        res.status(200).json({
            message:"Reimbursement Details Retrieved",
            data:data
        });
    }, (err) => {
        next(err);
    })
};

module.exports.searchReimbursements = (req, res) => {
    let search = {
        employee_id: req.params.employee_id,
        firstname: req.params.firstname,
        lastname:req.params.lastname
    }
    if(!search.employee_id || !search.firstname || !search.lastname) {
        hr.viewReimbursementDetails((data) => {
            res.send(data);
        });
    }else {
        hr.searchReimbursement(search, (data) => {
            res.status(200).json({
                message:"Reimbursement Details Retrieved",
                data:data
            });
        }, (err) => {
            next(err);
        })
    }
   
};

module.exports.approveReimbursement = (req, res) => {
    hr.approveReimbursement(req.params.id, (data)=> {
        if(!data.length){
            res.status(404).json({
                message:"Does not exist"
            })
        }
        else {
            res.status(200).json({
                message:"Approved"
            })
        }
    }, (err) => {
        next(err);
    })
}