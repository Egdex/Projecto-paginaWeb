/*package com.fullstack.backend;

import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class Security {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Evita errores CSRF
            .authorizeHttpRequests(auth -> auth
                // Permitir acceso libre a Swagger
                .requestMatchers(
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html"
                ).permitAll()
                // ✅ Permitir todos los endpoints de la API (por ahora)
                .requestMatchers("/api/**").permitAll()
                // Todo lo demás (como recursos del sistema) también libre
                .anyRequest().permitAll()
            )
            .httpBasic(Customizer.withDefaults()); // Activa login básico si lo quieres probar
        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
*/