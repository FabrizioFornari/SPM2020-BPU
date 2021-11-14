package it.unicam.smartparking.security.config;

import it.unicam.smartparking.security.filters.AuthorizationFilter;
import it.unicam.smartparking.security.filters.RolesFilter;
import it.unicam.smartparking.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable();
        http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(
                        new AuthorizationFilter(authenticationManager(), jwtProvider)
                )
                .addFilterAfter(new RolesFilter(), AuthorizationFilter.class)
                .authorizeRequests()
                .antMatchers("/api/login","/api/admin/save").permitAll()
                .antMatchers("/api/**").authenticated()
                .anyRequest().permitAll();
    }
}