package com.example.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.service.SseService;

@API
@RequestMapping("/sse")
public class SseAPI {

	private final SseService sseService;

	public SseAPI(SseService sseService) {
		this.sseService = sseService;
	}

	@PostMapping
	public SseEmitter sse(@RequestParam(required = false, defaultValue = "10") long delay,
			@RequestParam(required = false, defaultValue = "none") String error) {
		if (error.equals("controller")) {
			throw new RuntimeException("コントローラーでエラー");
		}
		SseEmitter sseEmitter = new SseEmitter();
		sseService.sse(sseEmitter, delay, error);
		return sseEmitter;
	}
}
