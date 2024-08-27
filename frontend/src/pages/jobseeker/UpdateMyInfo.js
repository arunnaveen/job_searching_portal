import React,{ useState } from 'react';
import JobSeekerHeader from './JobSeekerHeader';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateMyInfo = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [address, setAddress] = useState('');
  const [profile, setProfile] = useState(null);
  const [resume, setResume] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const userId = user._id;
  const {id} = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId",userId);
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

    try {
     await axios.put(`http://localhost:5000/api/jobseeker/employee/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,  // Corrected the typo here
        },
      });
     
      // Uncomment and use navigate to redirect after successful submission
      // navigate("/jobprovider/request");
      navigate('/jobseeker/joblist');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <JobSeekerHeader />
       <div className='container'>
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <div className='border border-primary p-5'>
           <h2 className='text-center text-danger mb-3'>Update your Details</h2>
           <form className='row' onSubmit={onSubmit}>
           <div className='mb-2  col-md-4'>
             <input type='text' name='name'
              className='form-control border border-danger' 
              placeholder='Enter your name'
              onChange={(e)=>setName(e.target.value)}
             />
           </div>
           <div className='mb-2  col-md-4'>
             <input type='text' name='mobile'
              className='form-control border border-danger ' 
              placeholder='Enter your mobile number'
              onChange={(e)=>setMobile(e.target.value)}
             />
           </div>
           <div className='mb-2  col-md-4'>
             <input type='email' name='email'
              className='form-control border border-danger ' 
              placeholder='Enter your email'
              onChange={(e)=>setEmail(e.target.value)}
             />
           </div>
           <div className='mb-2 col-12'>
            <textarea className='form-control border border-danger'
            name='education'
            placeholder='Enter your Education details'
            onChange={(e)=>setEducation(e.target.value)}
            ></textarea>
           </div>
           <div className='mb-2 col-12'>
            <textarea className='form-control border border-danger '
            name='experience'
            placeholder='Enter your Work Experience details '
            onChange={(e)=>setExperience(e.target.value)}
            ></textarea>
           </div>
           <div className='mb-2 col-12'>
            <textarea className='form-control border border-danger '
            name='address'
            placeholder='Enter your address'
            onChange={(e)=>setAddress(e.target.value)}
            ></textarea>
           </div>
           <div className='mb-2'>
            <label htmlFor='profile'>Your profile</label>
             <input type='file' id='profile' name='profile'
             onChange={(e)=>setProfile(e.target.files[0])}
              className='form-control border border-danger' />
           </div>
           <div className='mb-3'>
            <label htmlFor='resume'>Upload Your resume</label>
             <input type='file' id='resume' name='resume'
              onChange={(e)=>setResume(e.target.files[0])}
              className='form-control border border-danger' />
           </div>
           <div className=' d-grid'>
             <button className='btn btn-primary btn-block' type='submit'>Submit</button>
           </div>
           </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default UpdateMyInfo;