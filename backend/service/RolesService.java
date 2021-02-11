package it.unicam.smartparking.service;

import it.unicam.smartparking.model.Roles;
import org.springframework.stereotype.Service;

public interface RolesService {
    public Roles getRolesByName(String name);
    
}
