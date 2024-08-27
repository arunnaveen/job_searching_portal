const jobdetails = require("../models/jobdetails");

// POST method (already provided by you)
const jobDetails = async (req, res) => {
    const {
        companyId,
        jobtitle,
        jobcatogary,
        qualification,
        experience,
        vacancies,
        location,
        package,
        jobtype,
        jobdescription
    } = req.body;

    try {
        const jobdetail = new jobdetails({
            companyId,
            jobtitle,
            jobcatogary,
            qualification,
            experience,
            vacancies,
            location,
            package,
            jobtype,
            jobdescription,
        });

        await jobdetail.save();
        res.status(200).json({ jobdetail });
    } catch (error) {
        console.error("error find when jobdetails uploading", error);
        res.status(500).send("server error");
    }
};


// GET method - Get job details by companyId
const getJobDetailsByCompanyId = async (req, res) => {
    
    try {
        const jobDetails = await jobdetails.find({ companyId: req.params.companyId });
        if (!jobDetails || jobDetails.length === 0) {
            return res.status(404).json({ message: 'No job details found for this companyId' });
        }
        res.status(200).json(jobDetails);
    } catch (error) {
        console.error("Error finding job details by companyId", error);
        res.status(500).send("Server error");
    }
};

const getJobDetailsByJobId = async (req, res) => {
    const { jobId } = req.params;
  
    try {
      const jobs = await jobdetails.findOne({ _id:jobId });
      if (!jobs) {
        return res.status(404).json({ msg: "No jobs found for this company" });
      }
      res.status(200).json(jobs);
    } catch (error) {
      console.error("Error fetching job details:", error);
      res.status(500).json({ msg: "Server error" });
    }
  };

// PUT method - Update job details by jobId
const updateJobDetailsById = async (req, res) => {
    try {
        const updatedJobDetail = await jobdetails.findByIdAndUpdate(
            req.params.jobId,
            req.body,
            { new: true }
        );
        if (!updatedJobDetail) {
            return res.status(404).json({ message: 'No job details found for this jobId' });
        }
        res.status(200).json(updatedJobDetail);
    } catch (error) {
        console.error("Error updating job details by jobId", error);
        res.status(500).send("Server error");
    }
};

// DELETE method - Delete job details by jobId
const deleteJobDetailsById = async (req, res) => {
    try {
        const deletedJobDetail = await jobdetails.findByIdAndDelete(req.params.jobId);
        if (!deletedJobDetail) {
            return res.status(404).json({ message: 'No job details found for this jobId' });
        }
        res.status(200).json({ message: 'Job details deleted successfully' });
    } catch (error) {
        console.error("Error deleting job details by jobId", error);
        res.status(500).send("Server error");
    }
};

module.exports = {
    jobDetails,
    getJobDetailsByCompanyId,
    updateJobDetailsById,
    deleteJobDetailsById,
    getJobDetailsByJobId
};
