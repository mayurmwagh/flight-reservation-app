package com.shivam.flightcheckinapp.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.shivam.flightcheckinapp.dtos.Booking;
import com.shivam.flightcheckinapp.entities.CheckIn;
import com.shivam.flightcheckinapp.repos.CheckInRepository;

@Service
public class CheckInService {

	@Autowired
	private CheckInRepository checkInRepository;

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private JwtService jwtService;

	@Value("${booking.service.url}")
	private String bookingServiceUrl;

	public String performCheckIn(Long bookingId, String numberOfBags, String jwtToken) {
		String username = jwtService.extractUsername(jwtToken);

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + jwtToken);

		HttpEntity<String> entity = new HttpEntity<>(headers);

		String bookingApiUrl = bookingServiceUrl + "/details/" + bookingId;
		ResponseEntity<Booking> response = restTemplate.exchange(bookingApiUrl, org.springframework.http.HttpMethod.GET,
				entity, Booking.class);

		if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
			throw new RuntimeException("Invalid Booking ID or Booking Service error.");
		}

		Booking booking = response.getBody();

		if (!booking.getUser().getUsername().equals(username)) {
			throw new AccessDeniedException("You are not authorized to check in this booking.");
		}



		if (booking != null) {
			// Save check-in details
			CheckIn checkIn = new CheckIn();
			checkIn.setBookingId(bookingId);
			checkIn.setNumberOfBags(numberOfBags);
			checkIn.setCheckInTime(LocalDateTime.now());
			checkInRepository.save(checkIn);

			return "Check-in successful for Booking ID: " + bookingId;
		}
		throw new RuntimeException("Invalid Booking ID.");
	}

}
