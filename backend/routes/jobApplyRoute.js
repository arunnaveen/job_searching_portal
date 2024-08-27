const express = require('express');
const { postJobApply, getAllJobApplications,getJobApplicationDetailsByEmpId, getJobApplicationById, updateJobApplyStatus} = require('../controllers/jobApplyController');
const router = express.Router();

router.post('/job', postJobApply);

router.get('/job/:companyId',getAllJobApplications);

router.get('/:id',getJobApplicationById);

router.get('/applied/:id',getJobApplicationDetailsByEmpId);

router.put('/:id',updateJobApplyStatus);

module.exports = router;
