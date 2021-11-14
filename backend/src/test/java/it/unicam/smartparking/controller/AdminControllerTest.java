package it.unicam.smartparking.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.unicam.smartparking.dto.FineDto;
import it.unicam.smartparking.dto.UsersDto;
import it.unicam.smartparking.model.Markers;
import it.unicam.smartparking.model.Roles;
import it.unicam.smartparking.model.Users;
import it.unicam.smartparking.security.jwt.JwtProvider;
import it.unicam.smartparking.security.jwt.JwtUser;
import it.unicam.smartparking.service.MarkersService;
import it.unicam.smartparking.service.ReservationService;
import it.unicam.smartparking.service.UsersService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static it.unicam.smartparking.utils.SmartParkingUtilsTest.createJwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AdminController.class)
class AdminControllerTest {

    @MockBean
    private UsersService usersService;
    @MockBean
    private ReservationService reservationService;
    @MockBean
    private MarkersService markersService;
    @MockBean
    private JwtProvider jwtProvider;
    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void init() throws IOException {
        Mockito.when(jwtProvider.getUserInfo(Mockito.any())).thenReturn(new JwtUser("1","test@gmail.com", List.of("Policeman")));
    }

    @Test
    void shouldGetUsers() throws Exception {
        this.mockMvc.perform(get("/api/admin/users")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of()))))
                .andExpect(status().isOk());
        Mockito.verify(usersService, Mockito.times(1)).getAllUsers();
    }

    @Test
    void shouldSaveUser() throws Exception {
        Users users = new Users(1,"NameTest","LastNameTest","emailTest@gmail.com","passwordTest",false, new HashSet<>(Collections.singletonList(new Roles())));
        this.mockMvc.perform(post("/api/admin/save")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(users)))
                .andExpect(status().isOk());
        Mockito.verify(usersService, Mockito.times(1)).saveUser(Mockito.any());
    }

    @Test
    void shouldNotSaveUser() throws Exception {
        Users users = new Users(1,"NameTest","LastNameTest","emailTest@gmail.com","passwordTest",false, new HashSet<>(Collections.singletonList(new Roles())));
        Mockito.when(usersService.getUserByEmail(Mockito.any())).thenReturn(new Users());
        this.mockMvc.perform(post("/api/admin/save")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(users)))
                .andExpect(status().isConflict());
        Mockito.verify(usersService, Mockito.times(0)).saveUser(Mockito.any());
    }





    @Test
    void getAllParkingViolations() throws Exception {
        this.mockMvc.perform(get("/api/admin/allParkingViolations")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of()))))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).getAllDriversFines();
    }

    @Test
    void getNrAllParkingViolations() throws Exception {
        this.mockMvc.perform(get("/api/admin/nrOfAllParkingViolations")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of()))))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).getNrOfAllParkingViolations();
    }

    @Test
    void updateSeenAdminFine() throws Exception {
        this.mockMvc.perform(put("/api/admin/updateSeenAdminFine")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(null)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).updateSeenAdminFine();

    }

    @Test
    void updateMarkers() throws Exception {
        Markers markers = new Markers();
        this.mockMvc.perform(put("/api/admin/updateMarkers")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(markers)))
                .andExpect(status().isOk());
        Mockito.verify(markersService, Mockito.times(1)).updateMarker(Mockito.any());
    }

    @Test
    void addMarkers() throws Exception {
        Markers markers = new Markers();
        this.mockMvc.perform(post("/api/admin/addMarkers")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(markers)))
                .andExpect(status().isOk());
        Mockito.verify(markersService, Mockito.times(1)).addMarker(Mockito.any());
    }

    @Test
    void deleteMarker() throws Exception {
        this.mockMvc.perform(delete("/api/admin/deleteMarker/1")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of()))))
                .andExpect(status().isOk());
        Mockito.verify(markersService, Mockito.times(1)).deleteMarker(Mockito.anyInt());
    }

    @Test
    void deleteDriverFine() throws Exception {
        this.mockMvc.perform(delete("/api/admin/deleteDriverFine/1")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of()))))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).deleteDriversFines(Mockito.anyInt());
    }

    @Test
    void updateDriverFine() throws Exception {
        FineDto fineDto = new FineDto("","",20,"","",2);
        this.mockMvc.perform(put("/api/admin/updateDriverFine")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(fineDto)))
                .andExpect(status().isOk());
        Mockito.verify(reservationService, Mockito.times(1)).updateDriverFine(Mockito.anyInt(),Mockito.anyInt());
    }
}