package com.shivam.flightcheckinapp.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Booking {
    private Long id;
    private String flightNumber;
    private String origin;
    private String destination;
    private String departureDate;
    private User user;

    
    public Booking() {
		
	}

	public Booking(Long id, String flightNumber, String origin, String destination, String departureDate, User user) {
		super();
		this.id = id;
		this.flightNumber = flightNumber;
		this.origin = origin;
		this.destination = destination;
		this.departureDate = departureDate;
		this.user = user;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(String departureDate) {
        this.departureDate = departureDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
