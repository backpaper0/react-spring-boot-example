package com.example.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.entity.Account;
import com.example.entity.Authority;
import com.example.repository.AccountRepository;

@Component
public class JpaUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    public JpaUserDetailsService(final AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {

        final Account account = accountRepository.findByName(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));

        return User.withUsername(account.getName())
                .password(account.getPassword().getEncodedPassword())
                .authorities(
                        account.getAuthorities().stream().map(Authority::getName)
                                .toArray(String[]::new))
                .build();
    }
}
