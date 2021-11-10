package it.unicam.smartparking.repository;

import it.unicam.smartparking.model.Fine;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FineRepository extends CrudRepository<Fine, Integer> {
}
