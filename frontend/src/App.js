import React from 'react';
import SignUp from './pages/user/SignUp';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LogIn from './pages/user/LogIn';
import CompanyDetails from './pages/jobprovider/ComapnyDetails';
import PostJob from './pages/jobprovider/PostJob';
import PostedJob from './pages/jobprovider/PostedJob';
import Request from './pages/jobprovider/Request';
import EmployeeDetails from './pages/jobprovider/EmployeeDetails';
import UpdatePostedJob from './pages/jobprovider/UpdatePostedJob';
import JobSeekerHeader from './pages/jobseeker/JobSeekerHeader';
import EmployeeForms from './pages/jobseeker/EmployeeForms';
import JobDetails from './pages/jobseeker/JobDetails';
import MyInfo from './pages/jobseeker/MyInfo';
import UpdateMyInfo from './pages/jobseeker/UpdateMyInfo';
import JobList from './pages/jobseeker/JobList';
import AppliedJobs from './pages/jobseeker/AppliedJobs';



function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/'  element = {<SignUp />}></Route>
            <Route path='/login' element = {<LogIn />}></Route>
            <Route path='/jobprovider/request' element={<Request />}></Route>
            <Route path='/jobprovider/postjob' element={<PostJob />}></Route>
            <Route path='/jobprovider/postedjob' element={<PostedJob />}></Route>
            <Route path='/companydetails' element = {<CompanyDetails />} ></Route>
            <Route path='/jobprovider/request/employee/:id' element={<EmployeeDetails />}></Route>
            <Route path='/jobprovider/postedjob/update/:id' element={<UpdatePostedJob />}></Route>
            <Route path='/jobseeker' element={<JobSeekerHeader />}></Route>
            <Route path='/employeedetails' element={<EmployeeForms />}></Route>
            <Route path='/jobseeker/jobdetails/:id' element={<JobDetails />}></Route>
            <Route path='/jobseeker/myinfo' element={<MyInfo />}></Route>
            <Route path='/jobseeker/updatemyinfo/:id' element={<UpdateMyInfo />} ></Route>
            <Route path='/jobseeker/joblist' element={<JobList />}></Route>
            <Route path='/jobseeker/appliedjob' element={<AppliedJobs />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App; 