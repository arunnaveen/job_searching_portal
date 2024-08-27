const mongoose = require("mongoose");

const jobprovider = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, require:true, ref: "User"
    },
    companyName: {
        type: String
    }, 
    aboutCompany: {
        type: String
    },
    logo: {
        data: Buffer,
        contentType: String
    }
})



module.exports = mongoose.model("jobprovider",jobprovider);