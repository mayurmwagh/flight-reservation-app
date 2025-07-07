package com.shivam.flightcheckinapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable() // Disable CSRF for simplicity (not recommended in production without additional safety measures)
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // Allow all requests without authentication
            );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Password encoder bean
    }
    
    @Bean
    public InMemoryUserDetailsManager inMemoryUserDetailsManager() {
        // Return an empty user details manager to disable default user creation
        return new InMemoryUserDetailsManager();
    }
}

