const express = require('express');
const router = express.Router();
const { postEmployeeData, getEmployeeDetails, updateEmployeeData ,getJobDetails, getJobAndCompanyDetails} = require("../controllers/jobSeekerController");

router.post('/employee', postEmployeeData);
router.get('/employee', getEmployeeDetails);
router.put('/employee/:id',updateEmployeeData);
router.get('/jobdetail',getJobDetails);
router.get('/jobdetail/:id',getJobAndCompanyDetails);


module.exports = router;