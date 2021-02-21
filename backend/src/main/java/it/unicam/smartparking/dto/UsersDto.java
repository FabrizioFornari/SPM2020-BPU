package it.unicam.smartparking.dto;

import lombok.Data;

@Data
public class UsersDto {


    private Integer id;

    private String name;

    private String lastName;

    private String email;

    private Boolean disabled;

    private String[] roles;

}
