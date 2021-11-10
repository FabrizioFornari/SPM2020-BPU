package it.unicam.smartparking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersDto {


    private Integer id;

    private String name;

    private String lastName;

    private String email;

    private Boolean disabled;

    private String[] roles;

}
