const mongoose = require("mongoose");

const jobdetails = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId, require: true,ref: 'jobprovider'
    },
    jobtitle: String,
    jobcatogary: String,
    qualification: String,
    experience: String,
    vacancies: String,
    location: String,
    jobtype: String,
    jobdescription: String,
    package: String,
})

module.exports = mongoose.model("jobdetails",jobdetails);