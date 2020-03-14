package com.example.api;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@API
@RequestMapping("/userinfo")
public class UserinfoAPI {

    @GetMapping
    public Object getUserinfo(final Authentication a) {
        return Map.of("name", a.getName(), "authorities", a.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
    }
}
