package com.shivam.flightreservationapp.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shivam.flightreservationapp.entities.LoginRequest;
import com.shivam.flightreservationapp.entities.LoginResponse;
import com.shivam.flightreservationapp.entities.User;
import com.shivam.flightreservationapp.services.UserService;

@RestController
//@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

//	@PostMapping("/register")
//	public ResponseEntity<String> registerUser(@RequestBody User user) {
//		userService.register(user);
//		return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
//	}
	
	
	//new edit
//	 @PostMapping("/register")
//	    public ResponseEntity<String> registerUser(@RequestBody User user, @RequestParam boolean isAdmin, Authentication authentication) {
//	        // Check if the current user has the "ROLE_ADMIN"
//	        if (isAdmin && !authentication.getAuthorities().stream()
//	                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"))) {
//	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can create new admins");
//	        }
//
//	        userService.register(user, isAdmin);
//	        return ResponseEntity.ok("User registered successfully");
//	    }
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@Validated @RequestBody User user, @RequestParam boolean isAdmin, Authentication authentication) {
	    try {
			if(isAdmin) {
				if (authentication == null) {
					return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication object is null");
				}

				if (!authentication.getAuthorities().stream()
						.anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"))) {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can create new admins");
				}
			}
	        userService.register(user, isAdmin);
	        return ResponseEntity.ok("User registered successfully");

	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
	    }
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
		Optional<LoginResponse> loginResponse = userService.login(loginRequest.getUsername(),
				loginRequest.getPassword());

		if (loginResponse.isPresent()) {
			return ResponseEntity.ok(loginResponse.get());
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findUserById(@PathVariable Long id) {
		Optional<User> user = userService.findById(id);

		if (user.isPresent()) {
			return ResponseEntity.ok(user.get());
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
	}
	
	  @GetMapping("/userList")
	    public ResponseEntity<List<User>> getAllUsers() {
	        List<User> users = userService.findAll();
	        return new ResponseEntity<>(users, HttpStatus.OK);
	    }

	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
		Optional<User> updatedUserOpt = userService.updateUser(id, updatedUser);

		if (updatedUserOpt.isPresent()) {
			return ResponseEntity.ok("User updated successfully");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
	}
	
	

}
