import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";

export default function Update() {
    const { id, token } = useSelector((store) => store.user);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [user, setUser] = useState([]);



    const updateUser = async (e) => {
        e.preventDefault();
        try {
            toast.success("Profile Updated Successfully")
            const response = await api.put(`/users/update/${id}`, {
                username,
                email,
                password,
                contactNumber,
                gender,
                age
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            navigate("/profile")
        } catch (error) {
            toast.error("Unable to update details")
            console.log('Error updating user:', error);
        }
    };

    const handleData = async (e) => {
        try {
            const response = await api.get(`/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            setUsername(response.data.username);
            setEmail(response.data.email);
            setPassword(response.data.password);
            setUser(response.data);
        } catch (error) {
            console.log("errorrrrrrrr...." + error)
        }
    };

    useEffect(() => {
        handleData();
    }, []);

    return <>
        <ToastContainer />
        <div className="update">
            <h2 className='display-4 text-center'>Edit Profile</h2>
            <form className="update-form form-control" onSubmit={updateUser} >
                <div className="row">
                    <div className="col-md-6">
                <label className="form-label">Your Id</label>
                <input type="number" className='form-control mt-1 mb-3' defaultValue={id} placeholder={id} readOnly="readOnly" />

                <label className="form-label">Your Username</label>
                <input type="text" className='form-control mt-1 mb-3' onChange={(e) => setUsername(e.target.value)} defaultValue={username} placeholder={username} />

                <label className="form-label">Your Email</label>
                <input type="email" className='form-control mt-1 mb-3' onChange={(e) => setEmail(e.target.value)} defaultValue={email} placeholder={email} />
                
                <label className="form-label">Your Password</label>
                <input type="text" className='form-control mt-1 mb-3' onChange={(e) => setPassword(e.target.value)}  />
                </div>
                <div className="col-md-6">
                <label className="form-label">Your Contact Number</label>
                <input type="text" className='form-control mt-1 mb-3' onChange={(e) => setContactNumber(e.target.value)} defaultValue={user.contactNumber} placeholder={user.contactNumber} />

                <label className="form-label">Your Gender</label>
                <input type="text" className='form-control mt-1 mb-3' onChange={(e) => setGender(e.target.value)} defaultValue={user.gender} placeholder={user.gender} />

                <label className="form-label">Your Age</label>
                <input type="number" className='form-control mt-1 mb-3' onChange={(e) => setAge(e.target.value)} defaultValue={user.age} placeholder={user.age} />

                </div>
                </div>
                <button className="btn btn-success" >Update Details</button>&nbsp;
                <Link to={"/profile"}><button className="btn btn-primary" >Go Back</button></Link>
            </form>
        </div>
    </>
}