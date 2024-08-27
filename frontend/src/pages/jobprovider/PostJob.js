import React,{useState, useEffect} from 'react';
import JobProviderHeader from './JobProviderHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyDetails } from '../../redux/auth/companySlice';


const PostJob = () => {
  const navigate =  useNavigate();
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.details);
  useEffect(() => {
    dispatch(fetchCompanyDetails());
  }, [dispatch]);
 

  console.log(company._id);
  const [formData, setFormData ] = useState({
    companyId: company._id,
    jobtitle: '',
    jobcatogary: '',
    qualification: '',
    experience: '',
    vacancies: '',
    package: '',
    location: '',
    jobtype: '',
    jobdescription: '',
  });

  const handleChange = (e) => {
    setFormData(
        {...formData,
            [e.target.name] : e.target.value
        }
    );

  }

  const onSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/jobdetail',formData);
      console.log(response.data);
      if (response) {
        navigate('/jobprovider/request');
      }
      
    }catch (error) {
        console.error("Error finding when jobdetails upload",error);
    }
  }
  return (
    <>
    <JobProviderHeader />
    <div className='container'>
       <div className='d-flex align-items-center justify-content-center min-vh-100'>
          <div className='border border-primary p-5'>
              <h2 className='text-center mb-4'>Post A Job</h2>
              <div >
              <form className='row' onSubmit={onSubmit}>
             
                      <div className='mb-3 col-md-6'>
                          <input className='form-control border border-danger' name='jobtitle' type='text' onChange={handleChange} placeholder='Enter Job title' required />
                      </div>
                      <div className='mb-3 col-md-6'>
                          <input className='form-control border border-danger' name='jobcatogary' onChange={handleChange} placeholder='Enter your Job catogary' required />
                      </div>
                      <div className='mb-3 col-md-6'>
                          <input className='form-control border border-danger' name='qualification' onChange={handleChange} placeholder='Qualification Details' required />
                      </div>
                      <div className='mb-3 col-md-6'>
                          <input className='form-control border border-danger' name='experience' onChange={handleChange} placeholder='Experience Details' required />
                      </div>
                      <div className='mb-3 col-md-6'>
                          <input className='form-control border border-danger' name='vacancies' onChange={handleChange} placeholder='Number of vacancies' required />
                      </div>
                      <div className='mb-3 col-md-6'>
                          <input className='form-control border border-danger' name='location' onChange={handleChange} placeholder='Job Location' required />
                      </div>
                      <div className='mb-3 col-md-6'>
                          <input className='form-control border border-danger' name='package'  onChange={handleChange} placeholder='Package Details' required />
                      </div>
                      <div className='mb-3 col-md-6'>
                          <input className='form-control border border-danger' name='jobtype'  onChange={handleChange} placeholder='Job Type ex.Full time' required />
                      </div>
                      <div className='mb-3 col-12'>
                        <textarea className='form-control border border-danger' name='jobdescription' onChange={handleChange} placeholder='Job Description'></textarea>
                      </div>
                      <div className='d-grid mb-2'>
                          <button className='btn btn-block btn-primary' type='submit'>Submit</button>
                      </div>

                </form>
                 
              </div>
          </div>
       </div>
    </div>
  </>
  )
}

export default PostJob;