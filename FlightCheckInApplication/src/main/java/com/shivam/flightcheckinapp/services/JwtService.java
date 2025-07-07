package com.shivam.flightcheckinapp.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final String SECRET_KEY = "hdhsdhjshdjsdh287902nc402nx32763767823q6x8xhgghs";

    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
    }
}
