import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
import JobSeekerHeader from './JobSeekerHeader';
import { Link } from 'react-router-dom';
import { fetchEmployeeDetails } from '../../redux/auth/employeeSlice';

const MyInfo = () => {
  const dispatch = useDispatch();
  const { details: employeeDetails, loading, error } = useSelector((state) => state.employee);
  const id = employeeDetails?.employee?._id;

  useEffect(() => {
    dispatch(fetchEmployeeDetails());
  }, [dispatch]);

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
      const base64String = btoa(
        new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      return `data:${contentType};base64,${base64String}`;
    }
    return '';
  };

  const profileImage = employeeDetails?.employee?.profile;
  const profileImageSrc = profileImage
    ? convertToBase64(profileImage.data.data, profileImage.contentType)
    : 'https://via.placeholder.com/150'; // Default image if no profile is set

  const resume = employeeDetails?.employee?.resume;
  const resumeSrc = resume
    ? convertToBase64(resume.data.data, resume.contentType)
    : null; // Default if no resume is set

  return (
    <>
      <JobSeekerHeader />
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
                <Card.Title>Name: {employeeDetails?.employee?.name || 'N/A'}</Card.Title>
                <Card.Text>Email: {employeeDetails?.employee?.email || 'N/A'}</Card.Text>
                <Card.Text>Mobile: {employeeDetails?.employee?.mobile || 'N/A'}</Card.Text>
                <Link to={`/jobseeker/updatemyinfo/${id}`}>
                  <Button variant='primary'>Update MyInfo</Button>
                </Link>
              </Card.Body>
            </div>
          </div>
          <Card.Body>
            <div className='row'>
              <Card.Text className='col-6'>Education: {employeeDetails?.employee?.education || 'N/A'}</Card.Text>
              <Card.Text className='col-6'>Experience: {employeeDetails?.employee?.experience || 'N/A'}</Card.Text>
              <Card.Text className='col-12'>Address: {employeeDetails?.employee?.address || 'N/A'}</Card.Text>
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
        </Card>
      </Container>
    </>
  );
};

export default MyInfo;
