package it.unicam.smartparking.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.unicam.smartparking.model.Markers;
import it.unicam.smartparking.service.MarkersService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = MarkersController.class)
class MarkersControllerTest {

    @MockBean
    private MarkersService markersService;

    @Autowired
    private MockMvc mockMvc;


    @Test
    void getUsers() throws Exception {
        this.mockMvc.perform(get("/api/markers"))
                .andExpect(status().isOk());
        Mockito.verify(markersService, Mockito.times(1)).getAllMarkers();
    }

    @Test
    void updateMarkers() throws Exception {
        Markers markers = new Markers();
        this.mockMvc.perform(put("/api/updateMarkers")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(markers)))
                .andExpect(status().isOk());
        Mockito.verify(markersService, Mockito.times(1)).updateMarker(Mockito.any());
    }

    @Test
    void addMarkers() throws Exception {
        Markers markers = new Markers();
        this.mockMvc.perform(post("/api/addMarkers")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(markers)))
                .andExpect(status().isOk());
        Mockito.verify(markersService, Mockito.times(1)).addMarker(Mockito.any());
    }

    @Test
    void deleteMarker() throws Exception {
        this.mockMvc.perform(delete("/api/deleteMarker/1"))
                .andExpect(status().isOk());
        Mockito.verify(markersService, Mockito.times(1)).deleteMarker(Mockito.anyInt());
    }
}