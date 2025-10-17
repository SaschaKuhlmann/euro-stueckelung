package com.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.http.CacheControl;
import org.springframework.lang.NonNull;
import java.util.concurrent.TimeUnit;

@Configuration
public class SpaWebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/en-US/**").addResourceLocations("classpath:/static/en-US/")
                .setCacheControl(CacheControl.maxAge(7, TimeUnit.DAYS));

        registry.addResourceHandler("/de/**").addResourceLocations("classpath:/static/de/")
                .setCacheControl(CacheControl.maxAge(7, TimeUnit.DAYS));
    }
}
