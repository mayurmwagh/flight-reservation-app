import React, { useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/register', { username, password, email, contactNumber, gender, age },
                {
                    params:{
                        isAdmin:false
                    }
                });
            toast.success("Registration Successful")

            navigate("/login")
        } catch (error) {
            toast.error("Something went wrong.....")
            console.log(error);
        }
    };

    return <>
        <ToastContainer />
        <div className='register'>
            <h2 className='mt-3 mb-2 display-3 text-center'>Register</h2>
            <form onSubmit={handleRegister} className='register-form form-control '>
                <div className='form-group mt-2 mb-2'>
                    <input type="text" placeholder="Username" className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className='form-group mt-3 mb-3'>
                    <input type="password" placeholder="Password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='form-group mt-3 mb-3'>
                    <input type="email" placeholder="Email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='form-group mt-3 mb-3'>
                    <input type="text" placeholder="Contact Number"  className='form-control' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                </div><
                    div className='form-group mt-3 mb-3'>
                    <input type='Text' placeholder="Gender" className='form-control' value={gender} onChange={(e) => setGender(e.target.value)} required />
                </div>
                <div className='form-group mt-3 mb-3'>
                    <input type='Text' placeholder="Age" className='form-control'value={age} onChange={(e) => setAge(e.target.value)} required />
                </div>
                <div className='form-group mt-3 mb-3'>
                    <button type="submit" className=' btn btn-primary'>Register</button>&nbsp; already registered <Link to={"/login"}>Log In</Link>
                </div>
            </form>
        </div>
    </>
}

export default Register;
