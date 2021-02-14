package it.unicam.smartparking.service;

import it.unicam.smartparking.model.Markers;

import java.util.List;


public interface MarkersService {

    public List<Markers> getAllMarkers();
    public List<Markers> updateMarker(Markers markers);
    public List<Markers> addMarker(Markers markers);
    public void deleteMarker(Integer id);

}
