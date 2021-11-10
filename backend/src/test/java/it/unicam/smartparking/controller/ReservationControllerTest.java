package it.unicam.smartparking.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.unicam.smartparking.dto.EnterExitDto;
import it.unicam.smartparking.dto.UsersDto;
import it.unicam.smartparking.model.Reservation;
import it.unicam.smartparking.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ReservationController.class)
class ReservationControllerTest {

    @MockBean
    private ReservationService reservationService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getReservations() throws Exception {
        this.mockMvc.perform(get("/api/reservations"))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).getAllReservations();
    }

    @Test
    void getReservationsByEmail() throws Exception {
        this.mockMvc.perform(get("/api/reservations/emailTest"))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).getAllReservationsByEmail(Mockito.anyString());
    }

    @Test
    void saveReservation() throws Exception {
        Reservation reservation = new Reservation();
        this.mockMvc.perform(post("/api/reservate")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(reservation)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).saveReservation(Mockito.any());
    }

    @Test
    void editReservation() throws Exception {
        Reservation reservation = new Reservation();
        this.mockMvc.perform(put("/api/editReservation")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(reservation)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).updateReservation(Mockito.any());
    }

    @Test
    void deleteReservation() throws Exception {
        this.mockMvc.perform(delete("/api/deleteReservation/1"))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).deleteReservation(Mockito.anyInt());
    }

    @Test
    void enter() throws Exception {
        EnterExitDto enterExitDto = new EnterExitDto();
        this.mockMvc.perform(put("/api/enter")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(enterExitDto)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).enter(Mockito.any());
    }

    @Test
    void exit() throws Exception {
        EnterExitDto enterExitDto = new EnterExitDto();
        this.mockMvc.perform(put("/api/exit")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(enterExitDto)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).exit(Mockito.any());
    }

    @Test
    void getParkingViolations() throws Exception {
        this.mockMvc.perform(get("/api/parkingViolations/emailTest"))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).getAllDriverFines(Mockito.anyString());
    }

    @Test
    void getNrParkingViolations() throws Exception {
        this.mockMvc.perform(get("/api/nrParkingViolations/emailTest"))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).getNrOfParkingViolations(Mockito.any());
    }

    @Test
    void updateSeenDriverFine() throws Exception {
        UsersDto users = new UsersDto(1,"NameTest","LastNameTest","emailTest@gmail.com",false, new String[]{"Driver"});
        this.mockMvc.perform(put("/api/updateSeenDriverFine")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(users)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).updateSeenDriverFine(Mockito.anyString());

    }

    @Test
    void getAllParkingViolations() throws Exception {
        this.mockMvc.perform(get("/api/allParkingViolations"))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).getAllDriversFines();
    }

    @Test
    void getNrAllParkingViolations() throws Exception {
        this.mockMvc.perform(get("/api/nrOfAllParkingViolations"))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).getNrOfAllParkingViolations();
    }

    @Test
    void updateSeenAdminFine() throws Exception {
        this.mockMvc.perform(put("/api/updateSeenAdminFine")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(null)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).updateSeenAdminFine();

    }
}