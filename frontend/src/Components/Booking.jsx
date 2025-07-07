import React, { useEffect, useState } from 'react';
import api from '../api';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Booking() {
    const { id, token } = useSelector((store) => store.user);
    const location = useLocation();
    const { flightId, flightNumber, origin, destination, departureDate, flightFare } = location.state;
    const navigate = useNavigate();
    const [seatNumber, setSeatNumber]=useState('12');
    // const [flightID, setFlightID]=useState(flightId);
    //console.log(flightId);
    //const dispatch = useDispatch();

    const generateSeatNumber = () => {
        return Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    };

    const handleBooking = async () => {
        if (!seatNumber) {
            toast.error("Seat number not assigned. Please try again.");
            return;
        }
        try {

            const response = await api.post('/bookings/book',
                {
                   
                },
                {
                    params: {
                        flightId,
                        seatNumber
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                });

            navigate("/my-bookings")
        } catch (error) {
            console.log('Error booking flights:', error);
            toast.error("Something went wrong, booking failed!!!")
        }
    };

    // const paymentPage=()=>{
    //     navigate("/payment", {
    //         state: {
    //             flightId:flightId,
    //             flightPrice: flightFare,
    //         },

    //     });
    // }


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
        } catch (error) {

            console.log("errorrrrrrrr...." + error) 
        }
    };

    useEffect(() => {
        handleData();
        setSeatNumber(generateSeatNumber());
        console.log("called" + seatNumber)
    }, []);

    return <>
        <ToastContainer />
        <div className='booking'>
            <h2 className='display-4 text-center'>Your Booking Details</h2>
            <form className="booking-form form-control" >
                <div className='row mb-2'>
                    <div className='col-md-6'>
                        <label className="form-label">Your Id</label>
                        <input type="number" className='form-control mt-1 mb-1' value={id} readOnly="readonly" />

                        <label className="form-label">Your Name</label>
                        <input type="text" className='form-control mt-1 mb-1' defaultValue={username} placeholder={username} />

                        <label className="form-label">Your Email</label>
                        <input type="email" className='form-control mt-1 mb-1' defaultValue={email} placeholder={email} />

                        <label className="form-label">Flight Id</label>
                        <input type="text" className='form-control mt-1 mb-1' value={flightId} readOnly="readonly" />

                        <label className="form-label">Flight Fare</label>
                        <input type="text" className='form-control mt-1 mb-1' value={"₹"+flightFare} readOnly="readonly" />
                    </div>
                    <div className='col-md-6'>
                        <label className="form-label">Flight number</label>
                        <input type="text" className='form-control mt-1 mb-1' value={flightNumber} readOnly="readonly" />

                        <label className="form-label">Deparure City</label>
                        <input type="text" className='form-control mt-1 mb-1' value={origin} readOnly="readonly" />

                        <label className="form-label">Arrival City</label>
                        <input type="text" className='form-control mt-1 mb-1' value={destination} readOnly="readonly" />

                        <label className="form-label">Departure Date</label>
                        <input type="text" className='form-control mt-1 mb-1' value={departureDate} readOnly="readonly" />

                        <label className="form-label">Seat Number</label>
                        <input type="number" className='form-control mt-1 mb-1' value={seatNumber} readOnly="readonly" />

                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleBooking}>Book Flight</button>
                {/* <button type="button" className="btn btn-primary" onClick={paymentPage} >Payment</button> */}
                &nbsp;
                <Link to={"/search-flights"}><button type="button" className="btn btn-secondary" >Back</button></Link>
            </form>
        </div>
    </>
}

export default Booking;
