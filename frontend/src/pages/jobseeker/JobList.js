import React, { useState, useEffect } from 'react';
import JobSeekerHeader from './JobSeekerHeader';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobList = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobseeker/jobdetail', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response) {
          setJobDetails(response.data);
          setFilteredJobs(response.data); // Initialize filteredJobs with all jobs
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const filterJobs = () => {
      const query = searchQuery.toLowerCase();
      const filtered = jobDetails.filter(job =>
        job.jobtitle.toLowerCase().includes(query) ||
        job.jobcatogary.toLowerCase().includes(query) ||
        job.jobtype.toLowerCase().includes(query) // Add any other fields to filter by
      );
      setFilteredJobs(filtered);
    };

    filterJobs();
  }, [searchQuery, jobDetails]);

  return (
    <>
      <div className='mb-3'>
        <JobSeekerHeader />
      </div>
      <div className='m-2'>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search by job title, category, or keyword"
            className="me-2"
            aria-label="Search Job"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-success" onClick={() => { /* Optionally handle search button click */ }}>
            Search
          </Button>
        </Form>
      </div>
      <Container>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Link to={`/jobseeker/jobdetails/${job._id}`} key={job._id} className='text-decoration-none'>
              <Card className='mb-2'>
                <Container>
                  <Card.Body>
                    <Row>
                      <Col md={4}>
                        <Card.Text>Job Title: {job.jobtitle}</Card.Text>
                      </Col>
                      <Col md={4}>
                        <Card.Text>Job Category: {job.jobcatogary}</Card.Text>
                      </Col>
                      <Col md={4}>
                        <Card.Text>Job Type: {job.jobtype}</Card.Text>
                      </Col>
                    </Row>
                    <Row className='mt-3'>
                      <Col md={4}>
                        <Card.Text>Job Vacancies: {job.vacancies}</Card.Text>
                      </Col>
                      <Col md={4}>
                        <Card.Text>Experience: {job.experience}</Card.Text>
                      </Col>
                      <Col md={4}>
                        <Card.Text>Location: {job.location}</Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Container>
              </Card>
            </Link>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </Container>
    </>
  );
};

export default JobList;
