import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyDetails } from '../../redux/auth/companySlice';

const JobProviderDashboard = () => {
  const dispatch = useDispatch();
  const companyDetails = useSelector((state) => state.company.details);
  const [logoSrc, setLogoSrc] = useState('');

  useEffect(() => {
    dispatch(fetchCompanyDetails());
  }, [dispatch]);

  useEffect(() => {
    if (companyDetails?.logo) {
      const convertToBlobURL = (data, contentType) => {
        const blob = new Blob([new Uint8Array(data)], { type: contentType });
        return URL.createObjectURL(blob);
      };

      setLogoSrc(convertToBlobURL(companyDetails.logo.data.data, companyDetails.logo.contentType));
    }
  }, [companyDetails]);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/jobprovider/request">
            {logoSrc ? (
              <img
                src={logoSrc}
                width="30"
                height="30"
                className="d-inline-block align-top rounded-circle me-2"
                alt="Logo"
              />
            ) : (
              <span>No Logo</span>
            )}
            <span className='text-center'>{companyDetails?.companyName || 'Company Name'}</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/jobprovider/request">Request</Nav.Link>
              <Nav.Link as={Link} to="/jobprovider/postjob">Post Job</Nav.Link>
              <Nav.Link as={Link} to="/jobprovider/postedjob">Posted Jobs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* You can include additional content here, such as a dashboard overview */}
    </>
  );
};

export default JobProviderDashboard;
