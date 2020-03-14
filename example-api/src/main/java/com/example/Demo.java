package com.example;

import java.util.List;

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

@Component
public class Demo implements ApplicationRunner {

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
}
