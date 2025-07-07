package com.shivam.flightreservationapp.components;

import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.shivam.flightreservationapp.entities.User;
import com.shivam.flightreservationapp.repositories.UserRepository;

@Component
public class AdminInitializer {
	 private final UserRepository userRepository;
	    private final PasswordEncoder passwordEncoder;

	    public AdminInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
	        this.userRepository = userRepository;
	        this.passwordEncoder = passwordEncoder;
	    }

	    @Bean
	    CommandLineRunner initDefaultAdmin() {
	        return args -> {
	            if (userRepository.findByUsername("admin").isEmpty()) {
	                User admin = new User();
	                admin.setUsername("admin");
	                admin.setPassword(passwordEncoder.encode("admin123"));
	                admin.setRoles(Set.of("ROLE_ADMIN", "ROLE_USER"));
	                userRepository.save(admin);
	                System.out.println("Default admin created: admin / admin123");
	            }
	        };
	    }
}
