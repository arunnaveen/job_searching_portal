import React,{useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { reset,login } from '../../redux/auth/authSlice';
import { Link , useNavigate} from 'react-router-dom';


const LogIn = () => {
    const [check, setCheck] = useState(false);
    const [psType, setPsType] = useState("password");
    const [formData, setFormData] = useState({
        email: '',
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
            toast("login successfully");
            if (user.usertype === "jobprovider") {
                navigate("/jobprovider/request");
            } else {
                navigate("/jobseeker/joblist");
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
        
        dispatch(login(formData));
    }
    
    return(
        <>
          <div className='container'>
             <div className='d-flex align-items-center justify-content-center min-vh-100'>
                <div className='border border-primary p-5'>
                    <h2 className='text-center mb-4'>LOG IN</h2>
                    <div>
                        <form onSubmit={onSubmit}>
                            <div className='mb-3'>
                                <input className='form-control border border-danger' onChange={onChange} name='email' type='email' placeholder='Enter your Email' required />
                            </div>
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
                            <div>Don't have an account ? <Link to="/">SIGNUP</Link></div>
                        </form>
                    </div>
                </div>
             </div>
          </div>
        </>
    )
}

export default LogIn;