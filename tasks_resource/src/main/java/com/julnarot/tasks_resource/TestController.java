package com.julnarot.tasks_resource;

import java.security.Principal;
import java.util.HashMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("testing-secured")
public class TestController {

    @GetMapping
    public HashMap<String, Object> getString(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        HashMap<String, Object> map = new HashMap<>();
        map.put("hello", "How it's going!");
        map.put("principal", principal);
        return map;
    }

}