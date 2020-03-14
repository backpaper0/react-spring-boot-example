package com.example.api;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@API
@RequestMapping("/csrf_token")
public class CsrfTokenAPI {

    @GetMapping
    public CsrfToken getCsrfToken(final CsrfToken csrfToken) {
        return csrfToken;
    }
}
