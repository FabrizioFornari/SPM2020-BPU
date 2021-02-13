package it.unicam.smartparking.repository;

import it.unicam.smartparking.model.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UsersRepository extends CrudRepository<Users, Integer> {
    public Users findByEmail(String email);
    public Users findByEmailAndPassword(String email, String password);
}
