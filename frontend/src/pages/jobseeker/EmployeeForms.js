import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitEmployeeForm } from '../../redux/auth/employeeSlice';
import { useNavigate } from 'react-router-dom';

const EmployeeForms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [address, setAddress] = useState('');
  const [profile, setProfile] = useState(null);
  const [resume, setResume] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobile", mobile);
    formData.append("email", email);
    formData.append("education", education);
    formData.append("experience", experience);
    formData.append("address", address);
    if (profile) {
      formData.append("profile", profile);
    }
    if (resume) {
      formData.append("resume", resume);
    }

    dispatch(submitEmployeeForm(formData));
    navigate('/jobseeker/joblist');
  };
  return (
    <div className='container'>
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <div className='border border-primary p-5'>
          <h2 className='text-center text-danger mb-3'>Please fill your Details</h2>
          <form className='row' onSubmit={onSubmit}>
            <div className='mb-2 col-md-4'>
              <input type='text' name='name'
                className='form-control border border-danger'
                placeholder='Enter your name'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mb-2 col-md-4'>
              <input type='text' name='mobile'
                className='form-control border border-danger'
                placeholder='Enter your mobile number'
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className='mb-2 col-md-4'>
              <input type='email' name='email'
                className='form-control border border-danger'
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-2 col-12'>
              <textarea className='form-control border border-danger'
                name='education'
                placeholder='Enter your Education details'
                onChange={(e) => setEducation(e.target.value)}
              ></textarea>
            </div>
            <div className='mb-2 col-12'>
              <textarea className='form-control border border-danger'
                name='experience'
                placeholder='Enter your Work Experience details'
                onChange={(e) => setExperience(e.target.value)}
              ></textarea>
            </div>
            <div className='mb-2 col-12'>
              <textarea className='form-control border border-danger'
                name='address'
                placeholder='Enter your address'
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <div className='mb-2'>
              <label htmlFor='profile'>Your profile</label>
              <input type='file' id='profile' name='profile'
                onChange={(e) => setProfile(e.target.files[0])}
                className='form-control border border-danger' />
            </div>
            <div className='mb-3'>
              <label htmlFor='resume'>Upload Your resume</label>
              <input type='file' id='resume' name='resume'
                onChange={(e) => setResume(e.target.files[0])}
                className='form-control border border-danger' />
            </div>
            <div className='d-grid'>
              <button className='btn btn-primary btn-block' type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmployeeForms;
