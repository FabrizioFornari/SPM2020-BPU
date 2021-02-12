package it.unicam.smartparking.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Permissions {

    @Id
    private Integer permissionId;

    private String permissionName;

    private String permissionDescription;

}
