package it.unicam.smartparking.model;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Users {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer userId;

    private String name;

    private String lastName;

    private String email;

    private String password;

    private Boolean disabled;

    //private boolean disabled ;


    @ManyToMany(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinTable(name = "\"user_has_roles\"",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Roles> userRoles = new HashSet<>();
}
