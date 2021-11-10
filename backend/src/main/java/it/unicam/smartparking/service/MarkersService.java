package it.unicam.smartparking.service;

import it.unicam.smartparking.model.Markers;
import it.unicam.smartparking.repository.MarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarkersService {

    @Autowired
    private MarkerRepository markerRepository;

    public List<Markers> getAllMarkers() {
        return (List<Markers>) markerRepository.findAll();
    }

    public List<Markers> updateMarker(Markers markers) {
        markerRepository.save(markers);
        return (List<Markers>) markerRepository.findAll();
    }

    public List<Markers> addMarker(Markers markers) {
        markerRepository.save(markers);
        return (List<Markers>) markerRepository.findAll();
    }

    public void deleteMarker(Integer id) {
        markerRepository.deleteById(id);
    }
}
