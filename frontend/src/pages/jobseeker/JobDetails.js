import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import JobSeekerHeader from './JobSeekerHeader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchEmployeeDetails } from '../../redux/auth/employeeSlice';
import { useSelector, useDispatch } from 'react-redux';

const JobDetails = () => {
   const { id } = useParams();
   const [jobDetails, setJobDetails] = useState({});
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [logoSrc, setLogoSrc] = useState(null);
   const user = JSON.parse(localStorage.getItem("user"));
   const token = user?.token;
   const dispatch = useDispatch();
   
   useEffect(() => {
      dispatch(fetchEmployeeDetails());
    }, [dispatch]);

   const { details: employeeDetails } = useSelector((state) => state.employee);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`http://localhost:5000/api/jobseeker/jobdetail/${id}`, {
               headers: {
                  Authorization: `Bearer ${token}`
               }
            });

            if (response && response.data) {
               const data = response.data;

               if (data.companydetails?.logo) {
                  const blob = new Blob([data.companydetails.logo.data.data], { type: data.companydetails.logo.contentType });
                  const url = URL.createObjectURL(blob);
                  setLogoSrc(url);
               }

               setJobDetails(data);
            }
         } catch (error) {
            setError("Error fetching job details.");
            console.error("Error fetching data", error);
         } finally {
            setLoading(false);
         }
      };
      fetchData();
   }, [id, token]);

   const jobApply = async () => {
      try {
         if (!employeeDetails || !employeeDetails.employee) {
            alert('Employee details are not available.');
            return;
         }
         
         let employeeData = {
            ...employeeDetails.employee,  // Flatten employee details
            companyId: jobDetails.companydetails?._id,  // Get company ID from jobDetails
            status: "applied"
         };
   
         const response = await axios.post('http://localhost:5000/api/jobapply/job', employeeData, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
   
         if (response.status === 200) {
            alert('Application submitted successfully!');
         } else {
            alert('Failed to submit the application.');
         }
      } catch (error) {
         console.error("Error applying for job:", error);
         alert('An error occurred while applying for the job.');
      }
   };
   
   if (loading) {
      return (
         <Container className='d-flex align-items-center justify-content-center min-vh-100'>
            <Spinner animation="border" role="status">
               <span className="sr-only">Loading...</span>
            </Spinner>
         </Container>
      );
   }

   if (error) {
      return (
         <Container className='d-flex align-items-center justify-content-center min-vh-100'>
            <Alert variant="danger">{error}</Alert>
         </Container>
      );
   }

   return (
      <>
         <JobSeekerHeader />
         <Container>
            <div className='d-flex align-items-center justify-content-center min-vh-100'>
               <div className='w-100 h-auto'>
                  <Button variant='primary' onClick={jobApply}>Apply for job</Button>
                  <h2 className='mb-2'>Job Details</h2>
                  <Row className='mb-2'>
                     <Col md={4}>
                        <Card>
                           <Card.Body>
                              <Card.Text><strong>Job Title:</strong> {jobDetails.jobtitle || 'N/A'}</Card.Text>
                              <Card.Text><strong>Job Category:</strong> {jobDetails.jobcatogary || 'N/A'}</Card.Text>
                              <Card.Text><strong>Job Type:</strong> {jobDetails.jobtype || 'N/A'}</Card.Text>
                           </Card.Body>
                        </Card>
                     </Col>
                     <Col md={4}>
                        <Card>
                           <Card.Body>
                              <Card.Text><strong>Experience:</strong> {jobDetails.experience || 'N/A'}</Card.Text>
                              <Card.Text><strong>Qualification:</strong> {jobDetails.qualification || 'N/A'}</Card.Text>
                              <Card.Text><strong>Vacancies:</strong> {jobDetails.vacancies || 'N/A'}</Card.Text>
                           </Card.Body>
                        </Card>
                     </Col>
                     <Col md={4}>
                        <Card>
                           <Card.Body>
                              <Card.Text><strong>Location:</strong> {jobDetails.location || 'N/A'}</Card.Text>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
                  <h2 className='mb-2'>Company Details</h2>
                  <Row className='mb-2'>
                     <Col md={4}>
                        {logoSrc ? (
                           <img
                              style={{ width: "50px", height: "50px" }}
                              src={logoSrc}
                              alt="Company Logo"
                              className="img-fluid rounded-circle d-inline-block"
                           />
                        ) : (
                           <span>No logo available</span>
                        )}
                     </Col>
                     <Col md={8}>
                        <h4 className='text-end'>{jobDetails.companydetails?.companyName || 'N/A'}</h4>
                     </Col>
                     <Col md={12} className='mt-2'>
                        <Card>
                           <Card.Body>
                              <Card.Title>About Company</Card.Title>
                              <Card.Text>{jobDetails.companydetails?.aboutCompany || 'N/A'}</Card.Text>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
               </div>
            </div>
         </Container>
      </>
   );
};

export default JobDetails;
