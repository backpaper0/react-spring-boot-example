package com.example.service;

import java.io.IOException;
import java.util.Map;
import java.util.PrimitiveIterator;
import java.util.concurrent.TimeUnit;

import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
public class SseService {

	private final String beginningOfAStudyInScarlet = "In the year 1878 1 took my degree o Doctor of Medicine of the University of London, and proceeded to Netley to go through the course prescribed for surgeons in the arm. Having completed my studies there, I was duly attached to the Fifth Northumberland Fusiliers as Assistant Surgeon. The regiment was stationed in India at the time, and before I could join it, the second Afghan war had broken out. On landing Bombay, I learned that my corps had advanced through the passes, and was already deep in the enemy's country. I followed, however, with many other rrers ro rere i te same situation as myself, and succeeded in reaching Candahar in safety, where I found my regiment, and at once entered upon my new duties.";

	@Async
	public void sse(SseEmitter sseEmitter, long delay, String error) {
		Exception exception = null;
		try {
			if (delay < 0 || 30 < delay) {
				throw new RuntimeException("Invalid delay");
			}
			PrimitiveIterator.OfInt iterator = beginningOfAStudyInScarlet.codePoints().iterator();
			int i = 0;
			while (iterator.hasNext()) {
				int codePoint = iterator.nextInt();
				int[] codePoints = { codePoint };
				String s = new String(codePoints, 0, 1);
				sseEmitter.send(Map.of("text", s), MediaType.APPLICATION_JSON);
				TimeUnit.MILLISECONDS.sleep(delay);

				i++;
				if (i == 100 && error.equals("async")) {
					throw new RuntimeException("非同期処理でエラー");
				}
			}
		} catch (Exception e) {
			try {
				sseEmitter.send(Map.of("error", e.getMessage()), MediaType.APPLICATION_JSON);
			} catch (IOException e1) {
				//TODO
			}
			exception = e;
		} finally {
			if (exception != null) {
				sseEmitter.completeWithError(exception);
			} else {
				sseEmitter.complete();
			}
		}
	}
}
