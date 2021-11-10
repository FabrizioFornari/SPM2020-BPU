package it.unicam.smartparking.repository;

import it.unicam.smartparking.model.Reservation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Integer> {
    public Reservation findByIdAndEmail(Integer id, String email);
    public List<Reservation> findByEmail(String email);
}
