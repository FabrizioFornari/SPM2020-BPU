package it.unicam.smartparking.controller;

import it.unicam.smartparking.dto.FineDto;
import it.unicam.smartparking.dto.UsersDto;
import it.unicam.smartparking.model.Markers;
import it.unicam.smartparking.model.Users;
import it.unicam.smartparking.service.MarkersService;
import it.unicam.smartparking.service.ReservationService;
import it.unicam.smartparking.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static it.unicam.smartparking.utils.SmartParkingConstants.ADMIN_API_BASE_PATH;

@RestController
@RequestMapping(value = ADMIN_API_BASE_PATH)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {

    @Autowired
    private UsersService usersService;
    @Autowired
    private MarkersService markersService;
    @Autowired
    private ReservationService reservationService;

    @GetMapping(value = "/users")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.ok(usersService.getAllUsers());
    }

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveUser(@RequestBody Users users){
        Users user = usersService.getUserByEmail(users.getEmail());
        if (user == null){
            usersService.saveUser(users);
            return ResponseEntity.ok("User Saved");
        }
        return new ResponseEntity<>("User already exist", HttpStatus.CONFLICT);
    }



    @PutMapping(value = "/updateMarkers")
    public ResponseEntity<?> updateMarkers(@RequestBody Markers markers){
        return ResponseEntity.ok(markersService.updateMarker(markers));
    }

    @PostMapping(value = "/addMarkers")
    public ResponseEntity<?> addMarkers(@RequestBody Markers markers){
        return ResponseEntity.ok(markersService.addMarker(markers));
    }

    @DeleteMapping(value = "/deleteMarker/{id}")
    public ResponseEntity<?> deleteMarker(@PathVariable Integer id){
        markersService.deleteMarker(id);
        return ResponseEntity.ok("Marker deleted");
    }

    @GetMapping(value = "/allParkingViolations")
    public ResponseEntity<?> getAllParkingViolations(){
        return ResponseEntity.ok( reservationService.getAllDriversFines());
    }

    @GetMapping(value = "/nrOfAllParkingViolations")
    public ResponseEntity<?> getNrAllParkingViolations(){
        return ResponseEntity.ok(reservationService.getNrOfAllParkingViolations());
    }

    @PutMapping(value = "/updateSeenAdminFine")
    public ResponseEntity<?> updateSeenAdminFine(){
        reservationService.updateSeenAdminFine();
        return ResponseEntity.ok("OK");
    }

    @DeleteMapping(value = "/deleteDriverFine/{id}")
    public ResponseEntity<?> deleteDriverFine(@PathVariable Integer id){
        reservationService.deleteDriversFines(id);
        return ResponseEntity.ok("OK");
    }

    @PutMapping(value = "/updateDriverFine")
    public ResponseEntity<?> updateDriverFine(@RequestBody FineDto fineDto){
        reservationService.updateDriverFine(fineDto.getId(), fineDto.getCost());
        return ResponseEntity.ok("OK");
    }

}
