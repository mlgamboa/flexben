const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hrController');
const verifyHRJWT = require('../middlewares/verifiyHRJWT');


router.get('/reimbursement-list/', verifyHRJWT, hrController.viewReimbursementList);
router.get('/reimbursement-details/', verifyHRJWT, hrController.viewReimbursementList);
router.get('/reimbursement/search/', verifyHRJWT, hrController.searchReimbursements);
router.put('/reimbursement/approve/:id', hrController.approveReimbursement);

module.exports = router