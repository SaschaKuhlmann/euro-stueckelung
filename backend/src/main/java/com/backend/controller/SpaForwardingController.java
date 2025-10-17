package com.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class SpaForwardingController {

    @GetMapping("/de/{path:^(?!index\\.html|.*\\..*).*}")
    public String forwardDe(@PathVariable String path) {
        return "forward:/de/index.html";
    }

    @GetMapping("/en-US/{path:^(?!index\\.html|.*\\..*).*}")
    public String forwardEn(@PathVariable String path) {
        return "forward:/en-US/index.html";
    }

    @GetMapping({"/de", "/de/"})
    public String rootDe() {
        return "forward:/de/index.html";
    }

    @GetMapping({"/en-US", "/en-US/"})
    public String rootEn() {
        return "forward:/en-US/index.html";
    }
}
