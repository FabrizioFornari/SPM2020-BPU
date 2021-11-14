package it.unicam.smartparking.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.unicam.smartparking.model.Roles;
import it.unicam.smartparking.model.Users;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

public class SmartParkingUtilsTest {
    private static final String USER = "user";
    private static final String EMAIL = "email";
    private static final String ROLE = "roles";

    public static String createJwt(Users users) throws JsonProcessingException {
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
}
