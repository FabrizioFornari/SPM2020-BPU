package it.unicam.smartparking.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.unicam.smartparking.dto.EnterExitDto;
import it.unicam.smartparking.dto.UsersDto;
import it.unicam.smartparking.model.Reservation;
import it.unicam.smartparking.model.Users;
import it.unicam.smartparking.security.jwt.JwtProvider;
import it.unicam.smartparking.security.jwt.JwtUser;
import it.unicam.smartparking.service.ReservationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import static it.unicam.smartparking.utils.SmartParkingUtilsTest.createJwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ReservationController.class)
class ReservationControllerTest {

    @MockBean
    private ReservationService reservationService;
    @MockBean
    private JwtProvider jwtProvider;
    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void init() throws IOException {
        Mockito.when(jwtProvider.getUserInfo(Mockito.any())).thenReturn(new JwtUser("1","test@gmail.com", List.of()));
    }

    @Test
    void getReservations() throws Exception {
        this.mockMvc.perform(get("/api/reservations")
                .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of()))))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).getAllReservations();
    }

    @Test
    void getReservationsByEmail() throws Exception {
        this.mockMvc.perform(get("/api/reservations/emailTest")
                .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))                )
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).getAllReservationsByEmail(Mockito.anyString());
    }

    @Test
    void saveReservation() throws Exception {
        Reservation reservation = new Reservation();
        this.mockMvc.perform(post("/api/reservate")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(reservation)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).saveReservation(Mockito.any());
    }

    @Test
    void editReservation() throws Exception {
        Reservation reservation = new Reservation();
        this.mockMvc.perform(put("/api/editReservation")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(reservation)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).updateReservation(Mockito.any());
    }

    @Test
    void deleteReservation() throws Exception {
        this.mockMvc.perform(delete("/api/deleteReservation/1")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of()))))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).deleteReservation(Mockito.anyInt());
    }

    @Test
    void enter() throws Exception {
        EnterExitDto enterExitDto = new EnterExitDto();
        this.mockMvc.perform(put("/api/enter")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(enterExitDto)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).enter(Mockito.any());
    }

    @Test
    void exit() throws Exception {
        EnterExitDto enterExitDto = new EnterExitDto();
        this.mockMvc.perform(put("/api/exit")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(enterExitDto)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).exit(Mockito.any());
    }

    @Test
    void getParkingViolations() throws Exception {
        this.mockMvc.perform(get("/api/parkingViolations/emailTest")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of()))))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).getAllDriverFines(Mockito.anyString());
    }

    @Test
    void getNrParkingViolations() throws Exception {
        this.mockMvc.perform(get("/api/nrParkingViolations/emailTest")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of()))))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).getNrOfParkingViolations(Mockito.any());
    }

    @Test
    void updateSeenDriverFine() throws Exception {
        UsersDto users = new UsersDto(1,"NameTest","LastNameTest","emailTest@gmail.com",false, new String[]{"Driver"});
        this.mockMvc.perform(put("/api/updateSeenDriverFine")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(users)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).updateSeenDriverFine(Mockito.anyString());

    }
}