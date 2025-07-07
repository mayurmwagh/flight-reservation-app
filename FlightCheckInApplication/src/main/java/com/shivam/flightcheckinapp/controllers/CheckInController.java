package com.shivam.flightcheckinapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shivam.flightcheckinapp.services.CheckInService;

@RestController
@RequestMapping("/api/checkin")
@CrossOrigin("*")
public class CheckInController {
	
	 @Autowired
	    private CheckInService checkInService;

	    @PostMapping("/{bookingId}")
	    public ResponseEntity<String> checkIn(@PathVariable Long bookingId, @RequestParam String numberOfBags,
	            @RequestHeader("Authorization") String authorizationHeader) {
	    	 String jwtToken = authorizationHeader.replace("Bearer ", "");

	         // Call the service method to perform check-in
	         String result = checkInService.performCheckIn(bookingId, numberOfBags, jwtToken);

	         return ResponseEntity.ok(result);
	    }
}
