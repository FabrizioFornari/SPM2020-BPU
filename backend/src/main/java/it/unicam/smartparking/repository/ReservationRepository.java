package it.unicam.smartparking.repository;

import it.unicam.smartparking.model.Reservation;
import it.unicam.smartparking.model.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Integer> {
    public Users findByEmail(String email);
}
