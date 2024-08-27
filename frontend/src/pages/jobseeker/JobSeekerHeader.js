import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

const JobSeekerHeader = () => {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobseeker/employee', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmployeeDetails(response.data);
      } catch (error) {
        setError("Error fetching employee details");
        console.error('Error fetching employee details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

    // Convert binary data to base64 encoded data URL
    const convertToBase64 = (data, contentType) => {
      if (data) {
        const blob = new Blob([new Uint8Array(data)], { type: contentType });
        return URL.createObjectURL(blob);
      }
      return '';
    };
  
    const profileImage = employeeDetails?.employee?.profile;
    const profileImageSrc = profileImage
      ? convertToBase64(profileImage.data.data, profileImage.contentType)
      : 'https://via.placeholder.com/150'; // Default image if no profile is set
  

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/jobseeker/myinfo">
            {profileImageSrc ? (
              <img
                width="30"
                height="30"
                className="d-inline-block align-top rounded-circle me-2"
                alt="Profile"
                src={profileImageSrc}
              />
            ) : (
              <span className='me-2'>No Profile Image</span>
            )}
            {employeeDetails?.employee.name ? (
              <span>{employeeDetails.employee.name}</span>
            ) : (
              <span>My Info</span>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='text-center'>
              <Nav.Link as={Link} to='/jobseeker/joblist'>Jobs</Nav.Link>
              <Nav.Link as={Link} to='/jobseeker/appliedjob'>Applied Job</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default JobSeekerHeader;
