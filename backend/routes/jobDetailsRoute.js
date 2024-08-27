const express = require("express");
const router = express.Router();
const {
    jobDetails,            // POST method
    getJobDetailsByCompanyId,  // GET method
    updateJobDetailsById,      // PUT method
    deleteJobDetailsById,
    getJobDetailsByJobId
} = require("../controllers/jobDetailsController");

// POST route
router.post('/', jobDetails);

// GET route by companyId
router.get('/:companyId', getJobDetailsByCompanyId);

// PUT route by jobId
router.put('/:jobId', updateJobDetailsById);

router.get('/job/:jobId',getJobDetailsByJobId);

// DELETE route by jobId
router.delete('/:jobId', deleteJobDetailsById);


module.exports = router;
