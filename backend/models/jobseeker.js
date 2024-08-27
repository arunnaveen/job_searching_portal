const mongoose = require("mongoose");

const Employee = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId ,
        require : true,
        ref: "User"
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
});

module.exports = mongoose.model("Employee",Employee);