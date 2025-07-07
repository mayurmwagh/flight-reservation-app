import React, { useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux-config/UserSlice';
import { toast, ToastContainer } from 'react-toastify';

export default function CheckIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', { username, password });
            toast.success("Log In Success");
            let id = response.data.userId;
            let token = response.data.token;
            let roles = response.data.roles;
            dispatch(setUser({ id, token, roles }))
            if (response.data.roles.includes("ROLE_ADMIN"))
                { 
                    navigate("/admin-profile")  
                }
            else {
                    navigate("/checkin-dashboard")
                    
                }

        } catch (error) {
            toast.error("Log In failed....");
            console.log(error);
        }
    };

    return <>
        <ToastContainer />
        <div className='login-form'>
            <h2 className='display-3'>Please Login for Checkin </h2>
            <form onSubmit={handleLogin} className="search-form form-control">
                <input type="text" placeholder="Username" className='form-control mt-4 mb-3' value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" className='form-control mt-3 mb-3' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className='btn btn-primary mt-1 mb-3'>Login</button>
                {/* &nbsp; new User? Please register first <Link to={"/register"}>Sign Up</Link> */}
            </form>
        </div>
    </>

}


