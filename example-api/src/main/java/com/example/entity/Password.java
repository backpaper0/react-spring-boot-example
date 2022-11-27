package com.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Password {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String encodedPassword;

	public Password() {
	}

	public Password(final Long id, final String encodedPassword) {
		this.id = id;
		this.encodedPassword = encodedPassword;
	}

	public Long getId() {
		return id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public String getEncodedPassword() {
		return encodedPassword;
	}

	public void setEncodedPassword(final String encodedPassword) {
		this.encodedPassword = encodedPassword;
	}
}
