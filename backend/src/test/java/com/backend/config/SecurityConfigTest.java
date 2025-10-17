package com.backend.config;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@SpringBootTest
class SecurityConfigTest {

    @Autowired
    private SecurityConfig securityConfig;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @SuppressWarnings("null") // We assert cors to be not null suppressing should be save
    @Test
    void testCorsConfiguration() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        CorsConfiguration cors = corsConfigurationSource.getCorsConfiguration(request);

        assertThat(cors).isNotNull();
        assertThat(cors.getAllowedOrigins()).containsExactly("http://localhost:4200",
                "http://127.0.0.1:4200");
        assertThat(cors.getAllowedMethods()).contains("GET", "POST", "PUT", "DELETE", "OPTIONS");
        assertThat(cors.getAllowCredentials()).isTrue();
        assertThat(cors.getAllowedHeaders()).containsExactly("*");
    }

    @Test
    void testSecurityFilterChainLoads() throws Exception {
        SecurityFilterChain chain = securityConfig.filterChain(null);
        assertThat(chain).isNotNull();
    }
}
