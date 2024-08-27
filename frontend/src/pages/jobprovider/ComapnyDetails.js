import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitCompanyDetails } from '../../redux/auth/companySlice';
import { useNavigate } from 'react-router-dom';

const CompanyDetails = () => {
  const [companyName, setCompanyName] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [logo, setLogo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("aboutCompany", aboutCompany);
    if (logo) {
      formData.append("logo", logo);
    }

    dispatch(submitCompanyDetails(formData));
    navigate("/jobprovider/request");
  };

  return (
    <div className='container'>
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <div className='border border-primary p-5'>
           <h2 className='text-center text-danger mb-3'>Please fill your company details</h2>
           <form onSubmit={handleFormSubmit}>
             <div className='mb-2'>
               <input 
                 type='text' 
                 name='companyName'
                 className='form-control border border-danger' 
                 placeholder='Enter your Company name'
                 onChange={(e) => setCompanyName(e.target.value)} 
                 value={companyName}
                 required
               />
             </div>
             <div className='mb-2'>
               <textarea 
                 name="aboutCompany"
                 className='form-control border border-danger' 
                 onChange={(e) => setAboutCompany(e.target.value)}
                 placeholder='Enter about your company' 
                 value={aboutCompany}
                 required
               />
             </div>
             <div className='mb-3'>
               <label htmlFor='logo'>Company Logo</label>
               <input 
                 type='file' 
                 id='logo'
                 onChange={(e) => setLogo(e.target.files[0])}
                 className='form-control border border-danger' 
               />
             </div>
             <div className='d-grid'>
               <button className='btn btn-primary btn-block' type='submit'>Submit</button>
             </div>
           </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
