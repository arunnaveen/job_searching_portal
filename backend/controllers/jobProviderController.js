const jobprovider = require("../models/jobprovider");

const companyDetails = async(req,res) => {
    const {companyName, aboutCompany} = req.body;
    const logo = req.file;
    try {
        const JobProvider = new jobprovider({
            userId: req.user.id,
            companyName,
            aboutCompany,
            logo: {
                data: logo.buffer,
                contentType: logo.mimetype,
            }
        })

        const company = await JobProvider.save();
        res.status(201).json(company);
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}

const getCompanyDetails = async(req,res) => {
   try{
    const userId = req.user.id;
    const company = await jobprovider.findOne({userId});

    if(!company) {
        res.status(400).send("No company details found for this company");
    }

    res.status(200).json(company)
   }catch (error) {
    console.error('Error fetching company data:', error);
    res.status(500).send('Internal Server Error');
  }
}


module.exports = {companyDetails, getCompanyDetails};