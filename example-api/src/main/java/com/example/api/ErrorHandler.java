package com.example.api;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandler {

	@ExceptionHandler(Throwable.class)
	@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
	public Object handle(Throwable t) {
		return Map.of("message", t.getMessage());
	}
}
