package com.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RootRedirectController {

    @GetMapping("/")
    public String rootRedirect(HttpServletRequest request) {
        String al = request.getHeader("Accept-Language");
        if (al != null && al.toLowerCase().startsWith("en")) {
            return "redirect:/en-US/";
        } else {
            return "redirect:/de/";
        }
    }
}
