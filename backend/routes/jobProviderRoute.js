const express = require('express');
const router = express.Router();
const {companyDetails, getCompanyDetails} = require("../controllers/jobProviderController");

router.post('/company',companyDetails);
router.get('/company',getCompanyDetails);

module.exports = router;