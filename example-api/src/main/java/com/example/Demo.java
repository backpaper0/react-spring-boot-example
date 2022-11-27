package com.example;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.entity.Account;
import com.example.entity.Authority;
import com.example.entity.Password;
import com.example.repository.AccountRepository;
import com.example.repository.AuthorityRepository;
import com.example.repository.PasswordRepository;

import jakarta.servlet.http.HttpSessionEvent;
import jakarta.servlet.http.HttpSessionListener;

@Component
public class Demo implements ApplicationRunner, HttpSessionListener {

	private static final Logger logger = LoggerFactory.getLogger(Demo.class);

	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private PasswordRepository passwordRepository;
	@Autowired
	private AuthorityRepository authorityRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Transactional
	@Override
	public void run(final ApplicationArguments args) throws Exception {
		final Password password = passwordRepository
				.save(new Password(null, passwordEncoder.encode("secret")));

		final List<Authority> authorities = authorityRepository.saveAll(
				List.of(new Authority(null, "AUTHORITY_1"), new Authority(null, "AUTHORITY_2")));

		accountRepository.save(new Account(null, "demo", password, authorities));
	}

	@Override
	public void sessionCreated(final HttpSessionEvent se) {
		logger.info("HttpSession created: {}", se.getSession().getId());
	}

	@Override
	public void sessionDestroyed(final HttpSessionEvent se) {
		logger.info("HttpSession destroyed: {}", se.getSession().getId());
	}
}
