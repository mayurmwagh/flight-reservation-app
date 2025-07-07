package com.shivam.flightreservationapp.controllers;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shivam.flightreservationapp.entities.Booking;
import com.shivam.flightreservationapp.entities.Flight;
import com.shivam.flightreservationapp.entities.User;
import com.shivam.flightreservationapp.repositories.BookingRepository;
import com.shivam.flightreservationapp.repositories.FlightRepository;
import com.shivam.flightreservationapp.repositories.UserRepository;
import com.shivam.flightreservationapp.services.BookingService;
import com.shivam.flightreservationapp.services.TicketPdfGeneratorService;

@RestController
//@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/api/bookings")
public class BookingController {

	@Autowired
	private BookingService bookingService;

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private TicketPdfGeneratorService ticketPdfGeneratorService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private FlightRepository flightRepository;
	
	
	@PostMapping("/book")
	public ResponseEntity<?> bookFlight(@RequestParam Long flightId, Principal principal, String seatNumber) {
		User user = userRepository.findByUsername(principal.getName())
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		Flight flight = flightRepository.findById(flightId).orElse(null);

		Booking booking = new Booking();
		booking.setUser(user);
		booking.setFlight(flight);
		booking.setBookingDate(LocalDate.now());
		booking.setSeatNumber(seatNumber);
		booking = bookingRepository.save(booking);

//		try {
//			String pdfPath = ticketPdfGeneratorService.generateTicketPdf(user, flight, booking);
//			return ResponseEntity.ok("Booking successful. Ticket saved at: " + pdfPath);
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to generate ticket PDF.");
//		}
		return ResponseEntity.ok("Booking successful! Your booking ID is: " + booking.getId());
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Long userId) {
		List<Booking> bookings = bookingService.getUserBookings(userId);
		return new ResponseEntity<>(bookings, HttpStatus.OK);
	}
	
	@GetMapping("/details/{bookingId}")
	public ResponseEntity<?> getBookingDetails(@PathVariable Long bookingId){
		Optional<Booking> booking = bookingService.getBookingDetails(bookingId);
		return new ResponseEntity<>(booking, HttpStatus.OK); 
	}

//	@GetMapping("/download-ticket/{bookingId}")
//	public ResponseEntity<InputStreamResource> downloadTicket(@PathVariable Long bookingId) throws IOException {
//		Booking booking = bookingRepository.findById(bookingId).orElse(null);
//
//		String pdfPath = "E:\\Tickets\\Ticket" + booking.getId()+"-"+booking.getBookingDate() + ".pdf";
//		File file = new File(pdfPath);
//
//		if (!file.exists()) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
//
//		InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
//		HttpHeaders headers = new HttpHeaders();
//		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ticket_" + booking.getId() + ".pdf");
//
//		return ResponseEntity.ok().headers(headers).contentLength(file.length()).contentType(MediaType.APPLICATION_PDF)
//				.body(resource);
//	}
	
	@GetMapping("/download-ticket/{bookingId}")
	public ResponseEntity<InputStreamResource> downloadTicket(@PathVariable Long bookingId) {
	    // Fetch booking details
	    Booking booking = bookingRepository.findById(bookingId)
	            .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

	    // Fetch user and flight details
	    User user = booking.getUser();
	    Flight flight = booking.getFlight();

	    try {
	        // Generate PDF dynamically
	        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	        ticketPdfGeneratorService.generateTicketPdf(user, flight, booking, outputStream);

	        ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());
	        InputStreamResource resource = new InputStreamResource(inputStream);

	        // Set headers
	        HttpHeaders headers = new HttpHeaders();
	        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ticket_" + booking.getId() + ".pdf");

	        return ResponseEntity.ok()
	                .headers(headers)
	                .contentLength(outputStream.size())
	                .contentType(MediaType.APPLICATION_PDF)
	                .body(resource);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(null);
	    }
	}
}
