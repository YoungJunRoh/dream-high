package com.springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfiguration {

    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .formLogin()
                .loginPage("/auths/login-form")
                .loginProcessingUrl("/auths/login-form?error")
                .and()
                .authorizeHttpRequests()
                .anyRequest()
                .permitAll();

        return http.build();
    }

    @Bean
    public UserDetailsManager userDetailsManager() {
        UserDetails userDetails =
                User.withDefaultPasswordEncoder()
                        .username("admin@gmail.com")
                        .password("1111")
                        .roles("USER")
                        .build();

        return new InMemoryUserDetailsManager(userDetails);

    }

}
