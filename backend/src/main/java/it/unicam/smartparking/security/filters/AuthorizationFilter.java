package it.unicam.smartparking.security.filters;

import it.unicam.smartparking.security.jwt.JwtProvider;
import it.unicam.smartparking.security.jwt.JwtUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class AuthorizationFilter extends BasicAuthenticationFilter {
    private static final String JWT_TOKEN = "jwt_token";
    private JwtProvider jwtProvider;

    @Autowired
    public AuthorizationFilter(AuthenticationManager authenticationManager, JwtProvider jwtProvider) {
        super(authenticationManager);
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(JWT_TOKEN);
        if (header == null) {
            chain.doFilter(req, res);
            return;
        }
        SecurityContextHolder.getContext().setAuthentication(getAuthentication(header));
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String jwtHeader) throws IOException {
        JwtUser jwtUser = jwtProvider.getUserInfo(jwtHeader);
        List<GrantedAuthority> grantedAuthorities =
                jwtUser.getAuthorities().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        return Objects.nonNull(jwtUser) ? new UsernamePasswordAuthenticationToken(jwtUser.getUsername(), jwtUser.getEmail(), grantedAuthorities) : null;
    }
}