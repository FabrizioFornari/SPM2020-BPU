package it.unicam.smartparking.repository;


import it.unicam.smartparking.model.Roles;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends CrudRepository<Roles, Integer> {
    public Roles findByRoleName(String name);

}
