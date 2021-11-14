package it.unicam.smartparking.repository;

import it.unicam.smartparking.model.Fine;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface FineRepository extends CrudRepository<Fine, Integer> {

    @Query(value = "DELETE FROM reservation_has_fine WHERE fine_id = ?1",
            nativeQuery = true)
    void deleteFineRelationships(@Param("1") Integer jobID);
}
