package it.unicam.smartparking.service;

import it.unicam.smartparking.dto.LoginUserDto;
import it.unicam.smartparking.dto.UserDto;
import it.unicam.smartparking.dto.UsersDto;
import it.unicam.smartparking.model.Permissions;
import it.unicam.smartparking.model.Roles;
import it.unicam.smartparking.model.Users;

import java.util.List;


public interface UsersService {

    public List<UsersDto> getAllUsers();
    public void saveUser(Users users);
    public boolean editUSer(UsersDto users);
    public boolean updatePassword(UserDto userDto);
    public void deleteUser(Integer userId);
    public Users getUser(Integer userId);
    public Users getUserByEmail(String email);
    public LoginUserDto checkUser(String email, String password);
    public List<Roles> getUserRoles(Integer userId);
    public List<Permissions> getUserPermissions(Integer userId);
}
