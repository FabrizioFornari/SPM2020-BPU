package it.unicam.smartparking.repository;

import it.unicam.smartparking.model.Markers;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MarkerRepository extends CrudRepository<Markers, Integer> {
}
