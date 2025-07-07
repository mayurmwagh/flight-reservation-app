package com.shivam.flightreservationapp.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.shivam.flightreservationapp.components.JwtUtil;
import com.shivam.flightreservationapp.entities.LoginResponse;
import com.shivam.flightreservationapp.entities.User;
import com.shivam.flightreservationapp.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtUtil jwtUtil;

	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

//	@Transactional
//	public User register(User user) {
//		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
//		return userRepository.save(user);
//	}
	
	//new edit
	public User register(User user, boolean isAdmin) {
	    user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
	    if (isAdmin) {
	        user.setRoles(Set.of("ROLE_ADMIN", "ROLE_USER"));
	    } else {
	        user.setRoles(Set.of("ROLE_USER"));
	    }
	    return userRepository.save(user);
	}

	public Optional<LoginResponse> login(String username, String password) {
		Optional<User> userOpt = userRepository.findByUsername(username);

		if (userOpt.isPresent() && new BCryptPasswordEncoder().matches(password, userOpt.get().getPassword())) {
			User user = userOpt.get();
			//String token = jwtUtil.generateToken(user.getUsername());  //new edit 
			String token = jwtUtil.generateToken(user.getUsername(), user.getRoles());
			return Optional.of(new LoginResponse(user.getId(), token, user.getRoles())); 
		}
		return Optional.empty();
	}

	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}
	
	public List<User> findAll() {
        return userRepository.findAll();
    }
	

	@Transactional
	public Optional<User> updateUser(Long id, User updatedUser) {
		Optional<User> existingUserOpt = userRepository.findById(id);

		if (existingUserOpt.isPresent()) {
			User existingUser = existingUserOpt.get();

			if (updatedUser.getUsername() != null && !updatedUser.getUsername().isEmpty()) {
				existingUser.setUsername(updatedUser.getUsername());
			}

			if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
				existingUser.setEmail(updatedUser.getEmail());
			}

			if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
//				existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
				 if (!passwordEncoder.matches(updatedUser.getPassword(), existingUser.getPassword())) {
		                // Only encode if it’s a new plain text password
		                existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
		            }
			}

			userRepository.save(existingUser);
			return Optional.of(existingUser);
		}
		return Optional.empty();
	}
}
