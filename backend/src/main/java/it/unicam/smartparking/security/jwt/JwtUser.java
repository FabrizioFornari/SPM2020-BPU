package it.unicam.smartparking.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtUser {

    String username;
    String email;
    List<String> authorities;
}
