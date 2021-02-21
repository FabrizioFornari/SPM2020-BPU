package it.unicam.smartparking.dto;

import lombok.Data;

@Data
public class UserDto {

    private String email;
    private String password;
    private String newPassword;

}
