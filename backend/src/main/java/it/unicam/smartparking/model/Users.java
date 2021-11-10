package it.unicam.smartparking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {

    public Users(Set<Roles> userRoles) {
        this.userRoles = userRoles;
    }

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer userId;

    private String name;

    private String lastName;

    private String email;

    private String password;

    private Boolean disabled;

    //private boolean disabled ;

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name = "\"user_has_roles\"",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Roles> userRoles = new HashSet<>();
}
