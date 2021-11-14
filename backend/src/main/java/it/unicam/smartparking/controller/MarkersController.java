package it.unicam.smartparking.controller;


import it.unicam.smartparking.service.MarkersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
