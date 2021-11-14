package it.unicam.smartparking.controller;

import it.unicam.smartparking.model.Users;
import it.unicam.smartparking.security.jwt.JwtProvider;
import it.unicam.smartparking.security.jwt.JwtUser;
import it.unicam.smartparking.service.MarkersService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = MarkersController.class)
class MarkersControllerTest {

    @MockBean
    private MarkersService markersService;
    @MockBean
    private JwtProvider jwtProvider;
    @Autowired
    private MockMvc mockMvc;


    @BeforeEach
    void init() throws IOException {
        Mockito.when(jwtProvider.getUserInfo(Mockito.any())).thenReturn(new JwtUser("1","test@gmail.com",List.of()));
    }


    @Test
    void getUsers() throws Exception {
         this.mockMvc.perform(get("/api/markers")
                         .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of()))))
                .andExpect(status().isOk());
        Mockito.verify(markersService, Mockito.times(1)).getAllMarkers();
    }

}