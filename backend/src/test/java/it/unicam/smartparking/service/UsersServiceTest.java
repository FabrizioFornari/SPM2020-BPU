package it.unicam.smartparking.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import it.unicam.smartparking.dto.LoginUserDto;
import it.unicam.smartparking.dto.UserDto;
import it.unicam.smartparking.dto.UsersDto;
import it.unicam.smartparking.model.Roles;
import it.unicam.smartparking.model.Users;
import it.unicam.smartparking.repository.RolesRepository;
import it.unicam.smartparking.repository.UsersRepository;
import it.unicam.smartparking.security.jwt.JwtProvider;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(SpringExtension.class)
class UsersServiceTest {

    @Mock
    private UsersRepository usersRepository;
    @Mock
    private RolesRepository rolesRepository;
    @Mock
    private RolesService rolesService;
    @Mock
    private JwtProvider jwtProvider;
    @InjectMocks
    private UsersService usersService;

    @Test
    void getAllUsers() {
        Roles rolePoliceman = new Roles(1, "Policeman", "Policeman", Collections.emptySet());
        Roles roleMunicipality = new Roles(2, "Municipality", "Municipality",  Collections.emptySet());
        Roles roleTowTruck = new Roles(2, "Tow Truck", "Tow Truck",  Collections.emptySet());
        Roles roleDriver = new Roles(1, "Driver", "Driver",  Collections.emptySet());
        List<Users> users = List.of(
                new Users(1, "Test", "Test", "user1@gmail.com", "123", false, new HashSet<>(List.of(roleDriver, roleMunicipality, rolePoliceman, roleTowTruck))),
                new Users(2, "Test", "Test", "user2@gmail.com", "123", false, new HashSet<>(List.of(roleDriver, roleMunicipality, rolePoliceman, roleTowTruck))),
                new Users(3, "Test", "Test", "user3@gmail.com", "123", false, new HashSet<>(List.of(roleDriver, roleMunicipality, rolePoliceman, roleTowTruck)))
        );
        Mockito.when(usersRepository.findAll()).thenReturn(users);
        List<UsersDto> usersDtos = usersService.getAllUsers();
        users.forEach(u  -> {
            UsersDto userDto = usersDtos.stream().filter(usersDto -> usersDto.getId().equals(u.getUserId())).findFirst().orElse(new UsersDto());
            Assertions.assertEquals(u.getUserId(), userDto.getId());
            Assertions.assertEquals(u.getName(), userDto.getName());
            Assertions.assertEquals(u.getLastName(), userDto.getLastName());
            Assertions.assertEquals(u.getDisabled(), userDto.getDisabled());
            u.getUserRoles().forEach(roles -> Assertions.assertTrue(Arrays.stream(userDto.getRoles()).anyMatch(r ->r.equals(roles.getRoleName()))));
        });
    }

    @Test
    void saveUser() {
        Roles roleDriver = new Roles(1, "Driver", "Driver",  Collections.emptySet());
        Mockito.when(rolesService.getRolesByName(Mockito.anyString())).thenReturn(roleDriver);
        Users users = new Users(1, "Test", "Test", "user1@gmail.com", "123", false, new HashSet<>(List.of()));
        usersService.saveUser(users);
        verify(usersRepository, times(1)).save(any());
    }

    @Test
    void editUser() {
        Roles roleDriver = new Roles(1, "Driver", "Driver",  Collections.emptySet());
        Users user = new Users(1, "Test", "Test", "user1@gmail.com", "123", false, new HashSet<>(List.of(roleDriver)));
        Mockito.when(usersRepository.findByEmail(Mockito.anyString())).thenReturn(user);
        UsersDto users = new UsersDto(1,"NameTest","LastNameTest","emailTest@gmail.com",false, new String[]{"Driver"});
        Mockito.when(rolesRepository.findByRoleName(Mockito.anyString())).thenReturn(new Roles());
        usersService.editUser(users);
        verify(usersRepository, times(1)).save(any());
    }

    @Test
    void editUserWithDisabledNull() {
        Roles roleDriver = new Roles(1, "Driver", "Driver",  Collections.emptySet());
        Users user = new Users(1, "Test", "Test", "user1@gmail.com", "123", null, new HashSet<>(List.of(roleDriver)));
        Mockito.when(usersRepository.findByEmail(Mockito.anyString())).thenReturn(user);
        UsersDto users = new UsersDto(1,"NameTest","LastNameTest","emailTest@gmail.com",null, new String[]{"Driver"});
        Mockito.when(rolesRepository.findByRoleName(Mockito.anyString())).thenReturn(new Roles());
        usersService.editUser(users);
        verify(usersRepository, times(1)).save(any());
    }

    @Test
    void shouldNotEditUser() {
        Mockito.when(usersRepository.findByEmail(Mockito.anyString())).thenReturn(null);
        UsersDto users = new UsersDto(1,"NameTest","LastNameTest","emailTest@gmail.com",false, new String[]{"Driver"});
        usersService.editUser(users);
        verify(usersRepository, times(0)).save(any());
    }

    @Test
    void updatePassword() {
        Roles rolePoliceman = new Roles(1, "Policeman", "Policeman", Collections.emptySet());
        Users user = new Users(1, "Test", "Test", "user1@gmail.com", "123", false, new HashSet<>(List.of(rolePoliceman)));
        Mockito.when(usersRepository.findByEmailAndPassword(Mockito.anyString(), Mockito.anyString()))
                .thenReturn(user);
        UserDto userDto = new UserDto("test@gmail.com","123","1234");
        usersService.updatePassword(userDto);
        verify(usersRepository, times(1)).save(any());
    }

    @Test
    void shouldNotUpdatePassword() {
        Mockito.when(usersRepository.findByEmailAndPassword(Mockito.anyString(), Mockito.anyString()))
                .thenReturn(null);
        UserDto userDto = new UserDto("test@gmail.com","123","1234");
        usersService.updatePassword(userDto);
        verify(usersRepository, times(0)).save(any());
    }

    @Test
    void getUserByEmail() {
        Roles rolePoliceman = new Roles(1, "Policeman", "Policeman", Collections.emptySet());
        Users user = new Users(1, "Test", "Test", "user1@gmail.com", "123", false, new HashSet<>(List.of(rolePoliceman)));
        Mockito.when(usersRepository.findByEmail(Mockito.anyString()))
                .thenReturn(user);
        Users userByEmail = usersService.getUserByEmail("user1@gmail.com");
        Assertions.assertEquals(user.getUserId(), userByEmail.getUserId());
        Assertions.assertEquals(user.getEmail(), userByEmail.getEmail());
        Assertions.assertEquals(user.getName(), userByEmail.getName());
        Assertions.assertEquals(user.getName(), userByEmail.getName());
    }

    @Test
    void checkUser() throws JsonProcessingException {
        Roles roleDriver = new Roles(1, "Driver", "Driver",  Collections.emptySet());
        Users user = new Users(1, "Test", "Test", "user1@gmail.com", "123", false, new HashSet<>(List.of(roleDriver)));
        Mockito.when(usersRepository.findByEmailAndPassword(Mockito.anyString(), Mockito.anyString()))
                .thenReturn(user);
        Mockito.when(jwtProvider.createJwt(Mockito.any())).thenReturn("");
        LoginUserDto loginUserDto = usersService.checkUser("user1@gmail.com", "123");
        Assertions.assertEquals(user.getUserId(), loginUserDto.getId());
        Assertions.assertEquals(user.getName(), loginUserDto.getName());
        Assertions.assertEquals(user.getLastName(), loginUserDto.getLastName());
        Assertions.assertEquals(user.getEmail(), loginUserDto.getEmail());
    }
}