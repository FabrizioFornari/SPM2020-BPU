package it.unicam.smartparking.service;

import it.unicam.smartparking.model.Roles;
import it.unicam.smartparking.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolesService{

    @Autowired
    private RolesRepository rolesRepository;

    public Roles getRolesByName(String name) {
        return rolesRepository.findByRoleName(name);
    }
}
