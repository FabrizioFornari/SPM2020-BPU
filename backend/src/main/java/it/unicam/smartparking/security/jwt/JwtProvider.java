package it.unicam.smartparking.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.unicam.smartparking.model.Roles;
import it.unicam.smartparking.model.Users;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtProvider {

    public static final String USER = "user";
    public static final String EMAIL = "email";
    public static final String ROLE = "roles";

    public String createJwt(Users users) throws JsonProcessingException {
        Set<String> rolesSet = users.getUserRoles()
                .stream().map(Roles::getRoleName).collect(Collectors.toSet());
        return JWT.create()
                .withSubject("user login")
                .withIssuer("Easy-Parking")
                .withIssuedAt(java.sql.Date.valueOf(LocalDate.now()))
                .withClaim(USER, users.getUserId())
                .withClaim(EMAIL, users.getEmail())
                .withClaim(ROLE,new ObjectMapper().writeValueAsString(rolesSet))
                .withExpiresAt(java.sql.Date.valueOf(LocalDate.now().plusDays(120)))
                .sign(Algorithm.HMAC384("secret"));
    }

    public DecodedJWT decodeJwt(String jwt) {
        try {
            return JWT.require(Algorithm.HMAC384("secret")).build().verify(jwt);
        } catch (JWTVerificationException e) {
            log.warn("Invalid JWT", e.getMessage());
        }
        return null;
    }

    public JwtUser getUserInfo(String jwtHeader) throws IOException {
        DecodedJWT decodedJWT = decodeJwt(jwtHeader);
        return Objects.nonNull(decodedJWT) ? getAuthority(decodedJWT) : null;
    }

    private JwtUser getAuthority(DecodedJWT decodedJWT) throws IOException {
        JwtUser jwtUser = new JwtUser();
        jwtUser.setEmail(getEmailClaim(decodedJWT));
        jwtUser.setUsername(getUserClaim(decodedJWT));
        jwtUser.setAuthorities(new ObjectMapper().readValue(getRolesClaim(decodedJWT), List.class));
        return jwtUser;
    }

    private String getUserClaim(DecodedJWT decodedJWT) {
        return Objects.nonNull(decodedJWT.getClaim(USER)) ? decodedJWT.getClaim(USER).asInt().toString() : "";
    }

    private String getEmailClaim(DecodedJWT decodedJWT) {
        return Objects.nonNull(decodedJWT.getClaim(EMAIL)) ? decodedJWT.getClaim(EMAIL).asString() : "";
    }

    private String getRolesClaim(DecodedJWT decodedJWT) {
        return Objects.nonNull(decodedJWT.getClaim(ROLE)) ? decodedJWT.getClaim(ROLE).asString() : "";
    }
}