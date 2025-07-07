import React, { useEffect, useState } from 'react';
import api from '../api';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const { id, token } = useSelector((store) => store.user);
    const today = new Date().toISOString().split('T')[0];

    const isFlightInThePast = (departureDate) => {
        return new Date(departureDate) < new Date(today);
    };

    const allBooking = async () => {
        try {
            const response = await api.get(`/bookings/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            setBookings(response.data);

        } catch (error) {
            console.log('Error booking flights:', error);
        }
    };

    useEffect(() => {
        allBooking();
        console.log("called")
    }, []);

    const downloadTicket = async (id) => {
        try {
            //toast.info("Ticket Downloaded Successfully");
            const response = await api.get(`/bookings/download-ticket/${id}`, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `ticket_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();

        }
        catch (error) {
            console.log(error);
        }
    };

    return <>
        <ToastContainer />
        <div className='booking-list p-4'>
            <h2 className='display-4 text-center'>Your Bookings</h2>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>S.No</th>
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
                        bookings.map((booking, index) => <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{booking.flight.flightNumber}</td>
                            <td>{booking.flight.origin}</td>
                            <td>{booking.flight.destination}</td>
                            <td>{booking.bookingDate}</td>
                            <td>{booking.flight.departureDate}</td>
                            <td><button className='btn btn-info' onClick={() => downloadTicket(booking.id)} disabled={isFlightInThePast(booking.flight.departureDate)} >Download Ticket</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </>
}

export default BookingsList;
