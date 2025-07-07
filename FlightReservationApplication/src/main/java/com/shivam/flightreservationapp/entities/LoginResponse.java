package com.shivam.flightreservationapp.entities;

import java.util.Set;

public class LoginResponse {
	private Long userId;
	private String token;
	 private Set<String> roles;

	public LoginResponse(Long userId, String token, Set<String> roles) {
		super();
		this.userId = userId;
		this.token = token;
		this.roles = roles;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	//new edit
	public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
