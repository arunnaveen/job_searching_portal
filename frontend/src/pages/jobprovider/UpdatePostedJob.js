import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import JobProviderHeader from './JobProviderHeader';

const UpdatePostedJob = () => {
  const { id } = useParams(); // Get job ID from URL parameters
  const [jobDetails, setJobDetails] = useState({
    jobtitle: '',
    jobcatogary: '',
    qualification: '',
    experience: '',
    vacancies: '',
    location: '',
    package: '',
    jobtype: '',
    jobdescription: '',
  });

  useEffect(() => {
    // Fetch job details by ID when the component mounts
    axios.get(`http://localhost:5000/api/jobdetail/job/${id}`)
      .then((res) => {
        setJobDetails(res.data);
      })
      .catch((err) => console.error('Error fetching job details:', err));
  }, [id]);

  const handleChange = (e) => {
    setJobDetails({
      ...jobDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update job details via PUT request
    axios.put(`http://localhost:5000/api/jobdetail/${id}`, jobDetails)
      .then((res) => {
        alert('Job details updated successfully!');
        // Redirect or perform additional actions as needed
      })
      .catch((err) => console.error('Error updating job details:', err));
  };

  return (
    <>
      <JobProviderHeader />
      <div className='container'>
        <div className='d-flex align-items-center justify-content-center min-vh-100'>
          <div className='border border-primary p-5'>
            <h2 className='text-center mb-4'>Update Posted Job</h2>
            <form className='row' onSubmit={handleSubmit}>
              <div className='mb-3 col-md-6'>
                <input
                  className='form-control border border-danger'
                  name='jobtitle'
                  type='text'
                  placeholder='Enter Job title'
                  value={jobDetails.jobtitle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-3 col-md-6'>
                <input
                  className='form-control border border-danger'
                  name='jobcatogary'
                  placeholder='Enter your Job category'
                  value={jobDetails.jobcatogary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-3 col-md-6'>
                <input
                  className='form-control border border-danger'
                  name='qualification'
                  placeholder='Qualification Details'
                  value={jobDetails.qualification}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-3 col-md-6'>
                <input
                  className='form-control border border-danger'
                  name='experience'
                  placeholder='Experience Details'
                  value={jobDetails.experience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-3 col-md-6'>
                <input
                  className='form-control border border-danger'
                  name='vacancies'
                  placeholder='Number of vacancies'
                  value={jobDetails.vacancies}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-3 col-md-6'>
                <input
                  className='form-control border border-danger'
                  name='location'
                  placeholder='Job Location'
                  value={jobDetails.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-3 col-md-6'>
                <input
                  className='form-control border border-danger'
                  name='package'
                  placeholder='Package Details'
                  value={jobDetails.package}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-3 col-md-6'>
                <input
                  className='form-control border border-danger'
                  name='jobtype'
                  placeholder='Job Type (e.g., Full time)'
                  value={jobDetails.jobtype}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-3 col-12'>
                <textarea
                  className='form-control border border-danger'
                  name='jobdescription'
                  placeholder='Job Description'
                  value={jobDetails.jobdescription}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className='d-grid mb-2'>
                <button className='btn btn-block btn-primary' type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePostedJob;
