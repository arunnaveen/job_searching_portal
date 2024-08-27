import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import JobProviderHeader from './JobProviderHeader';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyDetails } from '../../redux/auth/companySlice';
import axios from 'axios';

const PostedJob = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const dispatch = useDispatch();
  const companyDetails = useSelector((state) => state.company.details);

  useEffect(() => {
    dispatch(fetchCompanyDetails()).then(() => {
      if (companyDetails && companyDetails._id) {
        axios.get(`http://localhost:5000/api/jobdetail/${companyDetails._id}`)
          .then((res) => setJobDetails(res.data))
          .catch((err) => console.error("Error fetching job details:", err));
      }
    });
  }, [dispatch, companyDetails]);

  const handleDelete = (jobId) => {
    axios.delete(`http://localhost:5000/api/jobdetail/${jobId}`)
      .then(() => {
        // Update the jobDetails state after deletion
        setJobDetails(jobDetails.filter(job => job._id !== jobId));
      })
      .catch((err) => console.error("Error deleting job:", err));
  };

  if (jobDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <JobProviderHeader />
      <Container>
        {jobDetails.map((job) => (
          <Card className='m-2 w-100 border border-primary' key={job._id}>
            <Card.Body>
              <div>Job Title: {job.jobtitle}</div>
              <div>Job Catogary: {job.jobcatogary}</div>
              <div className='d-flex justify-content-around m-2'>
                <Link className='w-50 m-2' to={`/jobprovider/postedjob/update/${job._id}`}>
                  <button className='btn btn-success w-100 btn-block d-grid'>Update</button>
                </Link>
                <button
                  className='btn btn-danger btn-block w-50 m-2'
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default PostedJob;
