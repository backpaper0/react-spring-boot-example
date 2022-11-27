package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
public class WebSecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
				.authorizeHttpRequests(authorizeRequests -> authorizeRequests
						.requestMatchers("/api/csrf_token").permitAll()

						.requestMatchers("/api/**").authenticated()

						.anyRequest().permitAll())

				.formLogin(formLogin -> formLogin
						.loginProcessingUrl("/api/login")
						.successHandler((req, res, auth) -> res.setStatus(HttpStatus.NO_CONTENT.value()))
						.failureHandler((req, res, e) -> res.setStatus(HttpStatus.UNAUTHORIZED.value())))

				.logout(logout -> logout
						.logoutUrl("/api/logout")
						.logoutSuccessHandler(
								(req, res, auth) -> res.setStatus(HttpStatus.NO_CONTENT.value())))

				.exceptionHandling(exceptionHandling -> exceptionHandling
						.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
						.accessDeniedHandler((req, res, e) -> res.setStatus(HttpStatus.FORBIDDEN.value())))
				.build();
	}
}
