import React,{useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { reset,register } from '../../redux/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const [check, setCheck] = useState(false);
    const [psType, setPsType] = useState("password");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        usertype: 'job seeker',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);
    
    useEffect(() => {
        if(isError) {
            toast.error(message);
        }
        if (isSuccess && user) {
            toast("register successfully");
            if (user.usertype === "jobprovider") {
                navigate("/companydetails");
            } else{
                navigate("/employeedetails");
            }
        }
        dispatch(reset());
    },[user, isLoading, isError, isSuccess, message, dispatch,navigate])

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };
   
    useEffect(() => {
        setPsType(check ? 'text' : "password");
    },[check]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    
      const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
        return passwordRegex.test(password);
      };
    const onSubmit = (e) => {
        e.preventDefault();

        if(!validateEmail(formData.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (!validatePassword(formData.password)) {
            toast.error('Password must contain at least one capital letter and one special character.');
            return;
          }
        
        dispatch(register(formData));
    }
    
    return(
        <>
          <div className='container'>
             <div className='d-flex align-items-center justify-content-center min-vh-100'>
                <div className='border border-primary p-5'>
                    <h2 className='text-center mb-4'>SIGN UP</h2>
                    <div>
                        <form onSubmit={onSubmit}>
                            <div className='mb-3'>
                                <input className='form-control border border-danger' onChange={onChange} name='name' type='text' placeholder='Enter your Name' required />
                            </div>
                            <div className='mb-3'>
                                <input className='form-control border border-danger' onChange={onChange} name='email' type='email' placeholder='Enter your Email' required />
                            </div>
                            <select className='form-select mb-3 border border-danger' name='usertype' onChange={onChange}>
                              <option value="jobseeker">jobseeker</option>
                              <option value="jobprovider">jobprovider</option>
                            </select>
                            <div className='mb-3'>
                                <input className='form-control border border-danger' name='password' onChange={onChange} type={psType} placeholder='Enter your Password' required />
                            </div>
                            
                            <div className='mb-2'>
                                 <label className='form-label' for="check">Show password</label>
                                 <input  type='checkbox' className='m-2 p-2' id='check' onChange={() => setCheck(!check)} />
                            </div>
                            <div className='d-grid mb-2'>
                                <button className='btn btn-block btn-primary'>Submit</button>
                            </div>
                            <div>Already have an account ? <Link to="/login">LOGIN</Link></div>
                        </form>
                    </div>
                </div>
             </div>
          </div>
        </>
    )
}

export default SignUp;