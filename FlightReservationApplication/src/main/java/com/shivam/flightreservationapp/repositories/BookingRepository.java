package com.shivam.flightreservationapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivam.flightreservationapp.entities.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	List<Booking> findByUserId(Long userId);
	
	
}
