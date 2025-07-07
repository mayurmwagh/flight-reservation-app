import React, { useState } from 'react';
import api from '../api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


function FlightSearch() {
    const [flights, setFlights] = useState([]);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const { token } = useSelector((store) => store.user)
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
    
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
           const formattedDate = departureDate ? new Date(departureDate).toISOString().slice(0, 10) : '';
            const response = await api.get('/flights/search', {
                params: {
                    origin: origin,
                    destination: destination,
                    departureDate: formattedDate,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            // setFlights(response.data);
            // if (response.data.length === 0) {
            //     toast.error("No flights on the selected date");
            // }
            const flightsWithPrices = response.data.map((flight) => ({
                ...flight,
                price: (Math.random() * 15000 + 3500).toFixed(2),
            }));
            setFlights(flightsWithPrices);
            if (flightsWithPrices.length === 0) {
                toast.error("No flights on the selected date");
            }

        } catch (error) {
            toast.error("No flight found...")
            console.log('Error fetching flights:', error);

        }
    };

    const changeValue = (e) => {
        e.preventDefault();
        let temp = destination;
        setDestination(origin);
        setOrigin(temp);
    }

    const handleBooking = (flight) => {
        const currentDate = new Date().toISOString().slice(0, 10);
        if (flight.departureDate < currentDate) {
            toast.error("Cannot book a flight with a past date.");
        } else {
            navigate("/booking", {
                state: {
                    flightId: flight.id,
                    flightNumber: flight.flightNumber,
                    origin: flight.origin,
                    destination: flight.destination,
                    departureDate: flight.departureDate,
                    flightFare: flight.price,
                },
            });
            
          }
    };


    return <>
        <ToastContainer />
        <div className='flight-search-from'>
            <h2 className='text-center display-4'>Search Flights</h2>
            <form onSubmit={handleSearch} className='form-control'>
                <div className='form-group mt-3 mb-3'>
                    <input type="text" placeholder="Origin" className='form-control' value={origin} onChange={(e) => setOrigin(e.target.value)} required />
                </div>
                <button className='btn btn-primary change-button' onClick={changeValue}><i className='bx bx-up-arrow-alt'></i><i className='bx bx-down-arrow-alt' ></i></button>
                <div className='form-group mt-3 mb-3'>
                    <input type="text" placeholder="Destination" className='form-control' value={destination} onChange={(e) => setDestination(e.target.value)} required />
                </div><div className='form-group mt-3 mb-3'>
                    <input type="date" placeholder="YYYY-MM-DD" className='form-control' defaultValue={today} min={today} value={departureDate} onChange={(e) => setDepartureDate(e.target.value)}  />
                </div>
                <div className='form-group mt-3 mb-3'>
                    <button type="submit" className=' btn btn-primary'>Search</button>
                </div>
            </form>
            <table className='table table-striped table-bordered mt-3'>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Flight Number</th>
                        <th>Departure City</th>
                        <th>Arrival City</th>
                        <th>Departure Date & Time</th>
                        <th>Available Seats</th>
                        <th>Price</th>
                        <th>Booking</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        flights.map((flight, index) => <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{flight.flightNumber}</td>
                            <td>{flight.origin}</td>
                            <td>{flight.destination}</td>
                            <td>{flight.departureTime}</td>
                            <td>{index + 5}</td>
                            <th>₹ {flight.price}</th>
                            <td><button className='btn btn-success' onClick={() => handleBooking(flight)}
                            >Book Flight</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </>
}

export default FlightSearch;
