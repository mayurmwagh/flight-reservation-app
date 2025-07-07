package com.shivam.flightreservationapp.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivam.flightreservationapp.entities.Booking;
import com.shivam.flightreservationapp.entities.Flight;
import com.shivam.flightreservationapp.entities.User;
import com.shivam.flightreservationapp.repositories.BookingRepository;
import com.shivam.flightreservationapp.repositories.FlightRepository;
import com.shivam.flightreservationapp.repositories.UserRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private UserRepository userRepository;

    public Booking bookFlight(Long userId, Long flightId, String seatNumber) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Flight> flight = flightRepository.findById(flightId);

        if (user.isPresent() && flight.isPresent()) {
            Booking booking = new Booking();
            booking.setUser(user.get());
            booking.setFlight(flight.get());
            booking.setBookingDate(LocalDate.now());
            booking.setSeatNumber(seatNumber);
            return bookingRepository.save(booking);
        } else {
            throw new IllegalArgumentException("Invalid user or flight ID");
        }
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    public Optional<Booking> getBookingDetails(Long bookingId) {
    	return bookingRepository.findById(bookingId);
    }

}

