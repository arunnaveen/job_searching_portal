const mongoose = require("mongoose");

const ApplyJob = new mongoose.Schema({
    companyId : {
        type: mongoose.Schema.Types.ObjectId ,
        require : true,
        ref: "jobprovider"
    },
    empId: {
        type: mongoose.Schema.Types.ObjectId ,
        require : true,
        ref: "Employee"
    },
    name: String,
    email: String,
    mobile: String,
    education: String,
    experience: String,
    address: String,
    profile : {
        data: Buffer,
        contentType: String,
    },
    resume : {
        data: Buffer,
        contentType: String,
    },
    status: String,
});

module.exports = mongoose.model("ApplyJob",ApplyJob);