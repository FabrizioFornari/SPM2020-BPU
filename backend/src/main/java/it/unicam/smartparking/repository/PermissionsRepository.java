package it.unicam.smartparking.repository;

import it.unicam.smartparking.model.Permissions;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionsRepository extends CrudRepository<Permissions, Integer> {
}
