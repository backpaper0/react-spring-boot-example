package com.example.api;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@API
@RequestMapping("/userinfo")
public class UserinfoAPI {

    @GetMapping
    public Object getUserinfo() {
        return Map.of("name", "example");
    }
}
