package it.unicam.smartparking.controller;


import it.unicam.smartparking.model.Markers;
import it.unicam.smartparking.service.MarkersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MarkersController {

    @Autowired
    private MarkersService markersService;

    @GetMapping(value = "/markers")
    public ResponseEntity<?> getUsers(){
        System.out.println("GET Markers is called");

        List<Markers> allMarkers = markersService.getAllMarkers();
        System.out.println(allMarkers);

        return ResponseEntity.ok(allMarkers);
    }


    @PutMapping(value = "/updateMarkers")
    public ResponseEntity<?> updateMarkers(@RequestBody Markers markers){
        System.out.println("updateMarkers is called");
        System.out.println(markers);

        List<Markers> markersList = markersService.updateMarker(markers);
        return ResponseEntity.ok(markersList);
    }

    @PostMapping(value = "/addMarkers")
    public ResponseEntity<?> addMarkers(@RequestBody Markers markers){
        System.out.println("addMarkers is called");
        System.out.println(markers);

        List<Markers> markersList = markersService.addMarker(markers);
        return ResponseEntity.ok(markersList);
    }

    @PostMapping(value = "/deleteMarker/")
    public ResponseEntity<?> deleteMarkers(@RequestBody Markers markers){
        System.out.println("addMarkers is called");
        System.out.println(markers);

        List<Markers> markersList = markersService.addMarker(markers);
        return ResponseEntity.ok(markersList);
    }

    @DeleteMapping(value = "/deleteMarker/{id}")
    public ResponseEntity<?> deleteMarker(@PathVariable Integer id){

        System.out.println("deleteMarker with id");
        System.out.println(id);
        markersService.deleteMarker(id);
        return ResponseEntity.ok("User Saved Successfully");

    }

}
