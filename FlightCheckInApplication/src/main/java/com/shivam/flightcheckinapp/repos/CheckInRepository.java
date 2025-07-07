package com.shivam.flightcheckinapp.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivam.flightcheckinapp.entities.CheckIn;

public interface CheckInRepository extends JpaRepository<CheckIn, Long> {

}
