import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import JobProviderHeader from './JobProviderHeader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyDetails } from '../../redux/auth/companySlice';

const Request = () => {
  const [jobApply, setJobApply] = useState([]);
  const dispatch = useDispatch();
  const companyDetails = useSelector((state) => state.company.details);

  useEffect(() => {
    dispatch(fetchCompanyDetails());
  }, [dispatch]);

  useEffect(() => {
    if (companyDetails && companyDetails._id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/jobapply/job/${companyDetails._id}`);
          setJobApply(response.data);
        } catch (error) {
          console.error('Error fetching job applications:', error);
        }
      };

      fetchData(); // Invoke fetchData only if companyDetails._id is available
    }
  }, [companyDetails]); // Dependency array includes companyDetails

  return (
    <>
      <JobProviderHeader />
      <div className='container'>
        {jobApply.length > 0 ? (
          jobApply.map((job) => (
            <Card key={job._id} className='m-2 w-100 border border-primary'>
              <Card.Header>
                <Card.Title>Name : {job.name}</Card.Title>
              </Card.Header>
              <Card.Body>Experience : {job.experience}</Card.Body>
              <Card.Body>Email : {job.email}</Card.Body>
              <Link className='text-center m-2' to={`/jobprovider/request/employee/${job._id}`}>
                <button className='btn btn-primary'>View</button>
              </Link>
            </Card>
          ))
        ) : (
          <div>No job applications found or loading...</div>
        )}
      </div>
    </>
  );
};

export default Request;
