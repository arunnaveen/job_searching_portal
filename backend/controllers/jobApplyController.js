const ApplyJob = require('../models/jobApply');
const mongoose = require("mongoose");

const postJobApply = async (req, res) => {
    const { companyId, name, email, mobile, education, experience, address, status, resume, profile , _id} = req.body;

 
    try {
        const employee = new ApplyJob({
            empId: _id,
            companyId,
            name,
            email,
            mobile,
            education,
            experience,
            address,
            profile,
            resume,
            status
        });

        await employee.save();

        res.json({ message: 'Employee created successfully', employee });
    } catch (error) {
        console.error('Error creating employee', error);
        res.status(500).json({ message: 'Error creating employee', error });
    }
}

const getAllJobApplications = async (req, res) => {
    const {companyId} = req.params;
    try {
        const jobApplications = await ApplyJob.find({companyId: companyId});
        res.status(200).json(jobApplications);
    } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).json({ message: 'Error fetching job applications', error });
    }
};


const getJobApplicationById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Job Application ID' });
    }

    try {
        const jobApplication = await ApplyJob.findById(id);
        if (!jobApplication) {
            return res.status(404).json({ message: 'Job Application not found' });
        }
        res.status(200).json(jobApplication);
    } catch (error) {
        console.error('Error fetching job application:', error);
        res.status(500).json({ message: 'Error fetching job application', error });
    }
};


const getJobApplicationDetailsByEmpId = async (req, res) => {
    const empId = req.params.id; // Assuming empId is a string

    try {
        // Debugging Step 1: Verify the direct match
        const matchedDocs = await ApplyJob.find({ empId: empId });
        console.log("Matched Documents:", matchedDocs); // Check if any documents match

        // Aggregation Pipeline
        const result = await ApplyJob.aggregate([
            {
                $match: { empId:new mongoose.Types.ObjectId(empId) } // Match documents with the given empId
            },
            {
                $lookup: {
                    from: "jobproviders",
                    localField: "companyId",
                    foreignField: "_id",
                    as: "companyInfo"
                }
            },
            {
                $unwind: {
                    path: "$companyInfo",
                    preserveNullAndEmptyArrays: true // Include documents even if companyInfo is empty
                }
            },
            {
                $project: {
                    _id: 0,
                    empId: 1,
                    name: 1,
                    email: 1,
                    mobile: 1,
                    education: 1,
                    experience: 1,
                    address: 1,
                    status: 1,
                    companyInfo: {
                        companyName: 1,
                        aboutCompany: 1,
                        logo: {
                            data: 1,
                            contentType: 1
                        }
                    }
                }
            }
        ]);

        console.log("Aggregation Result:", result); // Check the final result

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching job application details by empId:", error);
        res.status(500).json({ message: "Error fetching job application details", error });
    }
};





const updateJobApplyStatus = async (req, res) => {
    const { id } = req.params; // Get the job application ID from the URL parameters
    const { status } = req.body; // Get the status from the request body

    try {
        // Find the job application by ID and update its status
        const updatedJobApply = await ApplyJob.findByIdAndUpdate(
            id,
            { status }, // Update only the status field
            { new: true } // Return the updated document
        );

        if (!updatedJobApply) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        res.json({ message: 'Job application status updated successfully', updatedJobApply });
    } catch (error) {
        console.error('Error updating job application status:', error);
        res.status(500).json({ message: 'Error updating job application status', error });
    }
};

module.exports = { postJobApply,getJobApplicationDetailsByEmpId, getAllJobApplications, getJobApplicationById ,updateJobApplyStatus};
