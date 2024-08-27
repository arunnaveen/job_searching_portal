const Employee = require("../models/jobseeker");
const jobdetails = require("../models/jobdetails");
const jobprovider = require("../models/jobprovider");
const mongoose = require("mongoose");

const postEmployeeData = async(req,res) => {
    const { name, email, mobile, education, experience, address} = req.body;

    const profile = req.files['profile'] ? {
        data: req.files['profile'][0].buffer,
        contentType: req.files['profile'][0].mimetype,
    } : null;

    const resume = req.files['resume'] ? {
        data: req.files['resume'][0].buffer,
        contentType: req.files['resume'][0].mimetype,
    } : null;

    try{
        const employee = new Employee ({
            userId: req.user.id,
            name,
            email,
            mobile,
            education,
            experience,
            address,
            profile,
            resume
    });

        await employee.save();

        res.json({message: 'Employee created successfully',employee});
    }catch(error) {
        console.error('Error creating employee',error);
        res.status(500).json({message:'Error creating employee',error});
    }
    
}

const getEmployeeDetails = async (req, res) => {
    const userId = req.user.id;

    try {
        const employee = await Employee.findOne({ userId });

        if (!employee) {
            return res.status(400).send("Employee Details not found");
        }

        res.status(200).json({ employee });
    } catch (error) {
        console.error("Error fetching employee details", error);
        res.status(500).send("Internal server error");
    }
}
const updateEmployeeData = async (req, res) => {
    const { id } = req.params;
    console.log({ id });

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid or missing id" });
    }

    // Process the uploaded files
    const { userId, name, email, mobile, education, experience, address } = req.body;
    const profile = req.files['profile'] ? {
        data: req.files['profile'][0].buffer,
        contentType: req.files['profile'][0].mimetype,
    } : null;

    const resume = req.files['resume'] ? {
        data: req.files['resume'][0].buffer,
        contentType: req.files['resume'][0].mimetype,
    } : null;

    try {
        // Create an update object
        let updateData = {
            userId,
            name,
            email,
            mobile,
            education,
            experience,
            address
        };

        if (profile) {
            updateData.profile = profile;
        }

        if (resume) {
            updateData.resume = resume;
        }

        // Update the document in MongoDB
        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.status(200).json({ message: "Employee files updated successfully", employee: updatedEmployee });
    } catch (error) {
        console.error("Error when updating files", error);
        res.status(500).send("Server error");
    }
}


const getJobDetails = async(req,res) => {
    try {
        const jobdetail = await jobdetails.find();

        if(!jobdetail) {
            return res.status(401).send("Job details not found");
        }
        res.status(200).json(jobdetail);
    }catch(error) {
        console.error("error finding job details",error);
        res.status(500).send("server error");
    }
}

const getJobAndCompanyDetails = async(req, res) => {
    const { id } = req.params;
    try {
        const jobdetail = await jobdetails.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) } // Convert id to ObjectId
            },
            {
                $lookup: {
                    from: 'jobproviders',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'companydetails'
                }
            },
            {
                $unwind: "$companydetails" // Unwind the result to get a single object
            }
        ]);

        if (!jobdetail || jobdetail.length === 0) {
            return res.status(404).send("Job and company details not found");
        }

        res.status(200).json(jobdetail[0]); // Return the first matched document
    } catch (error) {
        console.error("Error fetching job and company details", error);
        res.status(500).send("Server error");
    }
};

module.exports = { postEmployeeData , getEmployeeDetails, updateEmployeeData, getJobDetails, getJobAndCompanyDetails};