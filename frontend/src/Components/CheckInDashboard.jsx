import axios from "axios";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { signOut } from "../Redux-config/UserSlice";



export default function CheckInDashboard() {
    const [bookingId, setBookingId] = useState('');
    const [numberOfBags, setNumberOfBags] = useState('');
    const { token } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const performCheckIn = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post(`${import.meta.env.VITE_API_CHECKIN_URL}/api/checkin/${bookingId}`,{}, {
                params: {
                    numberOfBags: numberOfBags,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            }); 
            toast.success('CheckIn successfull');
            // dispatch(signOut());
            navigate('/checkin-done');
        }
        catch (err) {
            console.log(err);
            toast.error('Something went wrong');
        }
    }

    return <>
        <ToastContainer />
        <div className="checkin">
            <h1 className="display-5 text-center">Perform CheckIn</h1>
            <form onSubmit={performCheckIn} className="form-control">
                <div className='form-group mt-3 mb-3'>
                    <label className="form-label">Booking Id</label>
                    <input type="text" placeholder="e.g.123XX" className='form-control' onChange={(e) => setBookingId(e.target.value)} required />
                </div>
                <div className='form-group mt-3 mb-3'>
                <label className="form-label">Number of bags</label>
                    <input type="text" placeholder="e.g. 2" className='form-control'  onChange={(e) => setNumberOfBags(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    </>
}
