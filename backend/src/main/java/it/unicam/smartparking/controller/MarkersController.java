package it.unicam.smartparking.controller;


import it.unicam.smartparking.model.Markers;
import it.unicam.smartparking.service.MarkersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static it.unicam.smartparking.utils.SmartParkingConstants.API_BASE_PATH;

@RestController
@RequestMapping(value = API_BASE_PATH)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MarkersController {

    @Autowired
    private MarkersService markersService;

    @GetMapping(value = "/markers")
    public ResponseEntity<?> getMarkers(){
        return ResponseEntity.ok(markersService.getAllMarkers());
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

}
