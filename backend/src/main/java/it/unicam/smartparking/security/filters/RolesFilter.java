package it.unicam.smartparking.security.filters;

import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.Objects.nonNull;
import static org.springframework.util.StringUtils.hasText;

public class RolesFilter implements Filter {

    private static final String ROLE_POLICEMAN = "Policeman";
    private static final String ROLE_MUNICIPALITY = "Municipality";

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        String uri = request.getRequestURI();

        if (hasText(uri)) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (nonNull(authentication)) {
                Set<String> authority = getAuthority(authentication);
                if (Objects.isNull(authority)) {
                    throw new AuthenticationServiceException("Unable to perform Admin operations");
                }
                if (uri.contains("admin")) {
                    boolean isAdmin = authority.stream().anyMatch(s -> s.equals(ROLE_POLICEMAN) || s.equals(ROLE_MUNICIPALITY));
                    if (!isAdmin)
                        throw new AuthenticationServiceException("Unable to perform Admin operations");
                }
            }
        }

        chain.doFilter(req, res);
    }

    private Set<String> getAuthority(Authentication authentication) {
        return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet());
    }

}