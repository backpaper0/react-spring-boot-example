package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Password;

public interface PasswordRepository extends JpaRepository<Password, Long> {
}
