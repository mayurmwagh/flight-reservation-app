import { useEffect, useState } from "react";
import api from "../api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";


export default function ViewFlightsList() {
    const [flights, setFlights] = useState([]);
    const {token} = useSelector((store) => store.user);

    const allFlights = async () => {
        try {
            const response = await api.get(`/flights/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            setFlights(response.data);

        } catch (error) {
            console.log('Error booking flights:', error);
        }
    };

    useEffect(() => {
        allFlights();
        console.log("All flights called")
    }, []);

    const deleteFlight = async(id)=>{
        try {
            const response =await api.delete(`/flights/delete/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            if(response.data)
                toast.success('Flight Deleted');
            setFlights((prevFlights) => prevFlights.filter((flight) => flight.id !== id));
        }
        catch(error){
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return <>
    <ToastContainer/>
        <div className='booking-list p-4'>
            <h2 className='display-4 text-center'>All Flights</h2>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Flight ID</th>
                        <th>Flight Number</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Departure Date</th>
                        <th>Booking Date</th>
                        <th>Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        flights.map((flight, index) => <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{flight.id}</td>
                            <td>{flight.flightNumber}</td>
                            <td>{flight.origin}</td>
                            <td>{flight.destination}</td>
                            <td>{flight.departureDate}</td>
                            <td>{flight.departureTime}</td>
                            <td><button className='btn btn-info'  >Update</button>&nbsp;&nbsp;&nbsp;<button className='btn btn-danger' onClick={()=>deleteFlight(flight.id)} >Delete</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </>
}