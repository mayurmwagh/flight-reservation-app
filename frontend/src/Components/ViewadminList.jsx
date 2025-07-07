import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import api from '../api';
import { ToastContainer } from "react-toastify";

export default function ViewadminList(){
    const { token } = useSelector((store) => store.user);
    const [user, setUser] = useState([]);
    
    const getAdmins= async(e)=>{
        try {
            const response = await api.get(`/users/userList`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            setUser(response.data);
            

        } catch (error) {
            console.log('Error  getting user details:', error);
        }
    }

    useEffect(() => {
        getAdmins();
        console.log("called admin list")
    }, []);
    return <>
        <ToastContainer/>
        <div className='booking-list p-5'>
            <h2 className='display-4 text-center'>All Admins</h2>
            <table className='table table-striped table-bordered p-4 rounded'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Contact</th>
                        <th>Age</th>
                        <th>Edit</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        user.filter(user => user.roles.includes("ROLE_ADMIN")).map((admin, index) => <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{admin.id}</td>
                            <td>{admin.username}</td>
                            <td>{admin.email}</td>
                            <td>{admin.gender}</td>
                            <td>{admin.contactNumber}</td>
                            <td>{admin.age}</td>
                            <td><button className='btn btn-secondary' >Update</button>&nbsp;&nbsp;&nbsp;
                            <button className='btn btn-warning' >Delete</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </>
}