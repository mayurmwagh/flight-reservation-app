package com.shivam.flightreservationapp.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivam.flightreservationapp.entities.Flight;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    List<Flight> findByOriginAndDestinationAndDepartureDate(String origin, String destination, LocalDate date);

    //	List<Flight> findByOriginAndDestinationAndDepartureDate(String origin, String destination);
    List<Flight> findByOriginAndDestination(String origin, String destination);
}
