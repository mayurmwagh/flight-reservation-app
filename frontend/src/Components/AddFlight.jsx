import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AddFlight() {
    const [flightNumber, setFlightNumber] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    
    const { token, roles } = useSelector((store) => store.user);
    const navigate = useNavigate();
    console.log(roles);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const formattedDate = departureDate ? new Date(departureDate).toISOString().slice(0, 10) : '';
        const formattedTime = `${departureDate}T${departureTime}:00`
        try {
            const response = await api.post("/flights/create", 
                {flightNumber, origin, destination, departureDate, departureTime: `${departureDate}T${departureTime}:00`,}, 
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }); 
            
            navigate('/view-flightlist');
        } catch (error) {
            console.log(formattedTime);
            console.error("Error adding flight:", error);
        }
    };
    return <>
        <div className="add-flight">
            <h1 className="display-4 text-center">Add Flight</h1>
            <form onSubmit={handleSubmit}>
            <div className='form-group mt-2 mb-2'>
                    <input type="text" placeholder="Flight Number" className='form-control'  onChange={(e) => setFlightNumber(e.target.value)} required />
                </div>
                <div className='form-group mt-3 mb-3'>
                    <input type="text" placeholder="Origin" className='form-control'  onChange={(e) => setOrigin(e.target.value)} required />
                </div>
                <div className='form-group mt-3 mb-3'>
                    <input type="text" placeholder="Destination" className='form-control'  onChange={(e) => setDestination(e.target.value)} required />
                </div>
                <div className='form-group mt-3 mb-3'>
                    <input type="date" placeholder="Departure Date"  className='form-control'  onChange={(e) => setDepartureDate(e.target.value)} required />
                </div><
                    div className='form-group mt-3 mb-3'>
                    <input type='time' placeholder="Departure Time" className='form-control'  onChange={(e) => setDepartureTime(e.target.value)} required />
                </div>
                <div className='form-group mt-3 mb-3'>
                    <button type="submit" className=' btn btn-primary'>Add Flight</button>
                </div>
            </form>
        </div>
    </>
}