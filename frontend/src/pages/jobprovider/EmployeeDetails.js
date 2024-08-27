import React, { useState, useEffect } from 'react';
import { Card, Container, Spinner, Alert, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import JobProviderHeader from './JobProviderHeader';

const EmployeeDetails = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobapply/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setError('Failed to fetch employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/api/jobapply/${id}`, {
        status: newStatus
      });
      setEmployee(response.data.updatedJobApply); // Update the employee state with the new data
    } catch (error) {
      console.error('Error updating employee status:', error);
      setError('Failed to update status.');
    } finally {
      setLoading(false);
    }
  };

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

  if (!employee) {
    return <p>No employee details available.</p>; // Handle case when no employee is found
  }

  // Convert binary data to base64 encoded data URL if necessary
  const convertToBase64 = (data, contentType) => {
    if (data) {
      const base64String = btoa(
        new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      return `data:${contentType};base64,${base64String}`;
    }
    return '';
  };

  const profileImage = employee.profile;
  const profileImageSrc = profileImage
    ? convertToBase64(profileImage.data.data, profileImage.contentType)
    : 'https://via.placeholder.com/150'; // Default image if no profile is set

  const resume = employee.resume;
  const resumeSrc = resume
    ? convertToBase64(resume.data.data, resume.contentType)
    : 'https://via.placeholder.com/150'; // Default if no resume is set

  return (
    <>
      <JobProviderHeader />
      <Container>
        <Card className="m-3 w-100 border border-primary">
          <div className="row no-gutters">
            <div className="col-md-4">
              <Card.Img
                src={profileImageSrc}
                alt="Profile"
                className="img-fluid rounded-circle d-inline-block"
              />
            </div>
            <div className="col-md-8 text-center">
              <Card.Body>
                <Card.Title>Name: {employee.name || 'N/A'}</Card.Title>
                <Card.Text>Email: {employee.email || 'N/A'}</Card.Text>
                <Card.Text>Mobile: {employee.mobile || 'N/A'}</Card.Text>
              </Card.Body>
            </div>
          </div>
          <Card.Body>
            <div className='row'>
              <Card.Text className='col-6'>Education: {employee.education || 'N/A'}</Card.Text>
              <Card.Text className='col-6'>Experience: {employee.experience || 'N/A'}</Card.Text>
              <Card.Text className='col-12'>Address: {employee.address || 'N/A'}</Card.Text>
            </div>
          </Card.Body>
          {resumeSrc && (
            <Card.Body>
              <iframe
                src={resumeSrc}
                title="Resume"
                style={{ width: '100%', height: '600px' }}
                frameBorder="0"
              />
            </Card.Body>
          )}
          <Card.Body className='text-center'>
            <Button
              variant='warning'
              className='m-2'
              onClick={() => handleStatusUpdate('Sort Liste')}
            >
              Sort Liste
            </Button>
            <Button
              variant='danger'
              className='m-2'
              onClick={() => handleStatusUpdate('Not Sort List')}
            >
              Not Sort List
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default EmployeeDetails;
