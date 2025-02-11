package com.business.inventory.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("password"))
                .roles("ADMIN")
                .build();

        UserDetails externo = User.builder()
                .username("externo")
                .password(passwordEncoder.encode("password123"))
                .roles("EXTERNO")
                .build();

        return new InMemoryUserDetailsManager(admin, externo);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // ✅ Forma moderna para deshabilitar CSRF
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // ✅ Configuración CORS
                .authorizeHttpRequests(auth -> auth
                        // ✅ Usuarios ADMIN y EXTERNO pueden ver el listado de empresas
                        .requestMatchers("/api/empresas/**", "/api/productos/**").hasAnyRole("ADMIN", "EXTERNO")

                        // ✅ Solo ADMIN puede crear, editar y eliminar empresas
                        .requestMatchers("/api/empresas/editar/**", "/api/empresas/eliminar/**", "/api/empresas/crear",
                                "/api/productos/crear", "/api/productos/editar/**", "/api/productos/eliminar/**",
                                "/api/categorias/**")
                        .hasRole("ADMIN")

                        // ✅ Cualquier otra solicitud requiere autenticación
                        .anyRequest().authenticated())
                .formLogin(form -> form
                        .loginProcessingUrl("/login")
                        .successHandler((request, response, authentication) -> {
                            response.setContentType("application/json");
                            response.getWriter().write("{ \"message\": \"Login exitoso\", \"username\": \""
                                    + authentication.getName() + "\", \"authorities\": \""
                                    + authentication.getAuthorities().toString() + "\" }");
                        })
                        .failureHandler((request, response, exception) -> {
                            response.setStatus(401);
                            response.getWriter().write("{ \"error\": \"Credenciales inválidas\" }");
                        })
                        .permitAll())
                .logout(logout -> logout.permitAll());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "staging.d1yvaa9860vy7f.amplifyapp.com"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true); // Importante si usas cookies o tokens de sesión

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
