import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { fetchEmployeeDetails } from '../../redux/auth/employeeSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import JobSeekerHeader from './JobSeekerHeader';

const AppliedJobs = () => {
    const dispatch = useDispatch();
    const [jobApplications, setJobApplications] = useState([]);
   
    useEffect(() => {
        dispatch(fetchEmployeeDetails());
    }, [dispatch]);
 
    const { details: employeeDetails } = useSelector((state) => state.employee);
    
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            if (employeeDetails && employeeDetails.employee && employeeDetails.employee._id) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/jobapply/applied/${employeeDetails.employee._id}`);
                    setJobApplications(response.data);
                } catch (error) {
                    console.error('Error fetching applied jobs:', error);
                }
            }
        };

        fetchAppliedJobs();
    }, [employeeDetails]);

    return (
        <>
            <JobSeekerHeader />
            {jobApplications.length > 0 ? (
                jobApplications.map((job) => (
                    <Card key={job._id} className="m-2">
                        <Card.Body>
                            <Card.Title>
                                {job.companyInfo && job.companyInfo && job.companyInfo.companyName 
                                    ? job.companyInfo.companyName 
                                    : 'Company Name Not Available'}
                            </Card.Title>
                            <Card.Text>
                                Position: {job.name || 'Position Not Available'}
                            </Card.Text>
                            <Card.Text>
                                Experience: {job.experience || 'Experience Not Available'}
                            </Card.Text>
                            <Card.Text>
                                Status: {job.status || 'Status Not Available'}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>No job applications found.</p>
            )}
        </>
    );
};

export default AppliedJobs;
