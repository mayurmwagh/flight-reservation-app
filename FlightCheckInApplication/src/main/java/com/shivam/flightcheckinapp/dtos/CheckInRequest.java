package com.shivam.flightcheckinapp.dtos;

public class CheckInRequest {
	private String numberOfBags;
	
	public CheckInRequest() {
		super();
	}

	public CheckInRequest(String numberOfBags) {
		super();
		this.numberOfBags = numberOfBags;
	}

	public String getNumberOfBags() {
		return numberOfBags;
	}

	public void setNumberOfBags(String numberOfBags) {
		this.numberOfBags = numberOfBags;
	}

	
	
	
}
