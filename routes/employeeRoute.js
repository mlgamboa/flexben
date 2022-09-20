const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const verifyEmployeeJWT = require('../middlewares/verifyEmeployeeJWT');


router.post('/reimbursement/details', verifyEmployeeJWT, employeeController.addReimbursementItem);
router.post('/reimbursement/list',verifyEmployeeJWT, employeeController.addReimbursementList);
router.delete('/reimbursement_id/:id', employeeController.deleteReimbursement);
router.get('/check/reimbursement/list/:id', verifyEmployeeJWT, employeeController.checkIfFileReimbursementListExist);
router.post('/calculate', employeeController.calculateFlexPoints);


module.exports = router;