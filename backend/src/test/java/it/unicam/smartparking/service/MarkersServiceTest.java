package it.unicam.smartparking.service;

import it.unicam.smartparking.model.Markers;
import it.unicam.smartparking.repository.MarkerRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

@ExtendWith(SpringExtension.class)
class MarkersServiceTest {

    @Mock
    private MarkerRepository markerRepository;
    @InjectMocks
    private MarkersService markersService;

    @Test
    void getAllMarkers() {
        Markers markers1 = new Markers(1,"TestMarker1",1,1,2);
        Markers markers2 = new Markers(2,"TestMarker2",2,2,2);
        Markers markers3 = new Markers(3,"TestMarker3",3,3,2);
        List<Markers> markers = List.of(markers1, markers2, markers3);
        Mockito.when(markerRepository.findAll()).thenReturn(markers);
        List<Markers> allMarkers = markersService.getAllMarkers();
        Assertions.assertEquals(markers.size(), allMarkers.size());
        markers.forEach(m -> Assertions.assertTrue(allMarkers.stream().anyMatch(marker -> marker.equals(m))));
    }


    @Test
    void updateMarker() {
         Markers marker = new Markers(4,"TestMarker",6,6,1);
        markersService.updateMarker(marker);
        Mockito.verify(markerRepository, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    void addMarker() {
        Markers marker = new Markers(4,"TestMarker",1,1,2);
        markersService.addMarker(marker);
        Mockito.verify(markerRepository, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    void deleteMarker() {
        markersService.deleteMarker(1);
        Mockito.verify(markerRepository, Mockito.times(1)).deleteById(Mockito.any());
    }
}