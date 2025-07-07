package com.shivam.flightreservationapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shivam.flightreservationapp.entities.Flight;
import com.shivam.flightreservationapp.services.FlightService;

@RestController
//@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/api/flights")
public class FlightController {

	@Autowired
	private FlightService flightService;

	@PostMapping("/create")
	public ResponseEntity<Flight> createFlight(@RequestBody Flight flight) {
		Flight createdFlight = flightService.createFlight(flight);
		return new ResponseEntity<>(createdFlight, HttpStatus.CREATED);
	}

	@GetMapping("/all")
	public ResponseEntity<List<Flight>> getAllFlights() {
		List<Flight> flights = flightService.getAllFlights();
		return new ResponseEntity<>(flights, HttpStatus.OK);
	}

	@GetMapping("/search")
	public ResponseEntity<List<Flight>> searchFlights(@RequestParam String origin, @RequestParam String destination,
			@RequestParam String departureDate) {
		List<Flight> flights = flightService.searchFlights(origin, destination, departureDate);
		return new ResponseEntity<>(flights, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteFlight(@PathVariable Long id) {
		flightService.deleteFlight(id);
		return new ResponseEntity<>("Flight deleted successfully", HttpStatus.OK);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @RequestBody Flight flightDetails) {
		Flight updatedFlight = flightService.updateFlight(id, flightDetails);
		return new ResponseEntity<>(updatedFlight, HttpStatus.OK);
	}
}
