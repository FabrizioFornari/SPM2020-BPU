package it.unicam.smartparking.controller;

import it.unicam.smartparking.dto.EnterExitDto;
import it.unicam.smartparking.dto.UserDto;
import it.unicam.smartparking.model.Reservation;
import it.unicam.smartparking.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static it.unicam.smartparking.utils.SmartParkingConstants.API_BASE_PATH;

@RestController
@RequestMapping(value = API_BASE_PATH)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping(value = "/reservations")
    public ResponseEntity<?> getReservations(){
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @GetMapping(value = "/reservations/{email}")
    public ResponseEntity<?> getReservationsByEmail(@PathVariable String email){
        return ResponseEntity.ok(reservationService.getAllReservationsByEmail(email));
    }

    @PostMapping(value = "/reservate")
    public ResponseEntity<?> saveReservation(@RequestBody Reservation reservation){
        reservationService.saveReservation(reservation);
        return ResponseEntity.ok("Reservation Saved");
    }

    @PutMapping(value = "/editReservation")
    public ResponseEntity<?> editReservation(@RequestBody Reservation reservation){
        reservationService.updateReservation(reservation);
        return ResponseEntity.ok("Reservation Updated");
    }

    @DeleteMapping(value = "/deleteReservation/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Integer id){
        reservationService.deleteReservation(id);
        return ResponseEntity.ok("Reservation Deleted");
    }

    @PutMapping(value = "/enter")
    public ResponseEntity<?> enter(@RequestBody EnterExitDto enterInfo){
        reservationService.enter(enterInfo);
        return ResponseEntity.ok("OK");
    }

    @PutMapping(value = "/exit")
    public ResponseEntity<?> exit(@RequestBody EnterExitDto exitInfo){
        reservationService.exit(exitInfo);
        return ResponseEntity.ok("OK");

    }

    @GetMapping(value = "/parkingViolations/{email}")
    public ResponseEntity<?> getParkingViolations(@PathVariable String email){
        return ResponseEntity.ok(reservationService.getAllDriverFines(email));
    }

    @GetMapping(value = "/nrParkingViolations/{email}")
    public ResponseEntity<?> getNrParkingViolations(@PathVariable String email){
        return ResponseEntity.ok(reservationService.getNrOfParkingViolations(email));
    }

    @PutMapping(value = "/updateSeenDriverFine")
    public ResponseEntity<?> updateSeenDriverFine(@RequestBody UserDto userDto){
        reservationService.updateSeenDriverFine(userDto.getEmail());
        return ResponseEntity.ok("OK");
    }

}
