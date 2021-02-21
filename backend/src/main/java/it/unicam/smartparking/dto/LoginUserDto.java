package it.unicam.smartparking.dto;

import lombok.Data;

@Data
public class LoginUserDto {


    private Integer id;

    private String name;

    private String lastName;

    private String email;

    private String disabled;

    private Integer[] roles;

    private String[] rolesString;

}
