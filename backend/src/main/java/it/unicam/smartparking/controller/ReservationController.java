package it.unicam.smartparking.controller;


import it.unicam.smartparking.model.Reservation;
import it.unicam.smartparking.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;


    @GetMapping(value = "/reservations")
    public ResponseEntity<?> getUsers(){

        List<Reservation> allReservations = reservationService.getAllReservations();
        System.out.println("List<Reservation>");
        System.out.println(allReservations);

        return ResponseEntity.ok(allReservations);
    }

    @PostMapping(value = "/reservate")
    public ResponseEntity<?> saveResrvation(@RequestBody Reservation reservation){

        System.out.println("saveResrvation");
        System.out.println(reservation);
        reservationService.saveReservation(reservation);
        return ResponseEntity.ok("User Saved Successfully");

    }

    @PutMapping(value = "/editReservation")
    public ResponseEntity<?> editResrvation(@RequestBody Reservation reservation){

        System.out.println("editResrvation");
        System.out.println(reservation);
        reservationService.updateReservation(reservation);
        return ResponseEntity.ok("User Saved Successfully");

    }


    @DeleteMapping(value = "/deleteReservation/{id}")
    public ResponseEntity<?> deleteResrvation(@PathVariable Integer id){

        System.out.println("deleteReservation with id");
        System.out.println(id);
        reservationService.deleteReservation(id);
        return ResponseEntity.ok("User Saved Successfully");

    }

}
