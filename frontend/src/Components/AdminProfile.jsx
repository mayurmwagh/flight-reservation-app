import { useSelector } from "react-redux"
import api from '../api';
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function AdminProfile(){
    const { id, token } = useSelector((store) => store.user)
    const [user, setUser] = useState([]);
    const handleData = async (e) => {
        try {
            const response = await api.get(`/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            setUser(response.data);
        } catch (error) {

            console.log(token + "and  " + id)
            console.log("errorrrrrrrr...." + error)
        }
    };

    useEffect(() => {
        handleData();
    }, []);

    return <>
        <ToastContainer />
        <div className='profile'>
            <h2 className='display-4 text-center'>Admin Profile</h2>
            <form className="profile-form form-control" >
                <div className="row">
                    <div className="col-md-6">


                        <label className="form-label">Your Id</label>
                        <input type="number" className='form-control mt-1 mb-2' defaultValue={user.id} readOnly="readonly" />
                        <label className="form-label">Your Username</label>
                        <input type="text" className='form-control mt-1 mb-2' defaultValue={user.username} readOnly="readonly" />
                        <label className="form-label">Your Email</label>
                        <input type="email" className='form-control mt-1 mb-2' defaultValue={user.email} readOnly="readonly" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Your Contact</label>
                        <input type="email" className='form-control mt-1 mb-2' defaultValue={user.contactNumber} readOnly="readonly" />
                        <label className="form-label">Your Gender</label>
                        <input type="email" className='form-control mt-1 mb-2' defaultValue={user.gender} readOnly="readonly" />
                        <label className="form-label">Your Age</label>
                        <input type="email" className='form-control mt-1 mb-4' defaultValue={user.age} readOnly="readonly" />
                    </div>
                </div>
                <Link to={"/update-profile"}><button type="button" className="btn btn-secondary">Edit Profile</button></Link>&nbsp;
                <Link to={"/search-flights"}><button className="btn btn-primary">Search Flight</button></Link>
            </form>
        </div>
    </>
}