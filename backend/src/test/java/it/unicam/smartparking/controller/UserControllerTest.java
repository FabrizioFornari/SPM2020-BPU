package it.unicam.smartparking.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.unicam.smartparking.dto.LoginUserDto;
import it.unicam.smartparking.dto.UserDto;
import it.unicam.smartparking.dto.UsersDto;
import it.unicam.smartparking.model.Users;
import it.unicam.smartparking.security.jwt.JwtProvider;
import it.unicam.smartparking.security.jwt.JwtUser;
import it.unicam.smartparking.service.RolesService;
import it.unicam.smartparking.service.UsersService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = UserController.class)
class UserControllerTest {
    @MockBean
    private UsersService usersService;
    @MockBean
    private RolesService rolesService;
    @MockBean
    private JwtProvider jwtProvider;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void init() throws IOException {
        Mockito.when(jwtProvider.getUserInfo(Mockito.any())).thenReturn(new JwtUser("1","test@gmail.com", List.of()));
    }


    @Test
    void checkUser() throws Exception {
        UsersDto users = new UsersDto(1,"NameTest","LastNameTest","emailTest@gmail.com",false, new String[]{"Driver"});
        Mockito.when(usersService.checkUser(Mockito.any(),Mockito.any())).thenReturn(new LoginUserDto());
        this.mockMvc.perform(post("/api/login")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                .content(new ObjectMapper().writeValueAsString(users)))
                .andExpect(status().isOk());
        Mockito.verify(usersService, Mockito.times(1)).checkUser(Mockito.any(), Mockito.any());
    }

    @Test
    void userNotFound() throws Exception {
        UsersDto users = new UsersDto(1,"NameTest","LastNameTest","emailTest@gmail.com",false, new String[]{"Driver"});
        Mockito.when(usersService.checkUser(Mockito.any(),Mockito.any())).thenReturn(null);
        this.mockMvc.perform(post("/api/login")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(users)))
                .andExpect(status().isNotFound());
        Mockito.verify(usersService, Mockito.times(1)).checkUser(Mockito.any(), Mockito.any());
    }

    @Test
    void shouldChangePassword() throws Exception {
        UsersDto users = new UsersDto(1,"NameTest","LastNameTest","emailTest@gmail.com",false, new String[]{"Driver"});
        Mockito.when(usersService.updatePassword(Mockito.any(UserDto.class))).thenReturn(true);
        this.mockMvc.perform(put("/api/changePassword")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(users)))
                .andExpect(status().isOk());
        Mockito.verify(usersService, Mockito.times(1)).updatePassword(Mockito.any());
    }

    @Test
    void shouldNotChangePassword() throws Exception {
        UsersDto users = new UsersDto(1,"NameTest","LastNameTest","emailTest@gmail.com",false, new String[]{"Driver"});
        Mockito.when(usersService.updatePassword(Mockito.any(UserDto.class))).thenReturn(false);
        this.mockMvc.perform(put("/api/changePassword")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(users)))
                .andExpect(status().isUnprocessableEntity());
        Mockito.verify(usersService, Mockito.times(1)).updatePassword(Mockito.any());
    }

    @Test
    void shouldEditUser() throws Exception {
        UsersDto users = new UsersDto(1,"NameTest","LastNameTest","emailTest@gmail.com",false, new String[]{"Driver"});
        Mockito.when(usersService.editUser(Mockito.any(UsersDto.class))).thenReturn(true);
        this.mockMvc.perform(put("/api/editUser")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(users)))
                .andExpect(status().isOk());
        Mockito.verify(usersService, Mockito.times(1)).editUser(Mockito.any());
    }
    @Test
    void shouldNotEditUser() throws Exception {
        UsersDto users = new UsersDto(1,"NameTest","LastNameTest","emailTest@gmail.com",false, new String[]{"Driver"});
        Mockito.when(usersService.editUser(Mockito.any(UsersDto.class))).thenReturn(false);
        this.mockMvc.perform(put("/api/editUser")
                        .contentType("application/json")
                        .header("jwt_token", createJwt(new Users(2,"Test","Test","test@gmail.com","password",false, Set.of())))
                        .content(new ObjectMapper().writeValueAsString(users)))
                .andExpect(status().isConflict());
        Mockito.verify(usersService, Mockito.times(1)).editUser(Mockito.any());
    }
}