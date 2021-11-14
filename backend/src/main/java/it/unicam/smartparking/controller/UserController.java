package it.unicam.smartparking.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import it.unicam.smartparking.dto.LoginUserDto;
import it.unicam.smartparking.dto.UserDto;
import it.unicam.smartparking.dto.UsersDto;
import it.unicam.smartparking.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static it.unicam.smartparking.utils.SmartParkingConstants.API_BASE_PATH;

@RestController
@RequestMapping(value = API_BASE_PATH)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UsersService usersService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> checkUser(@RequestBody UserDto userDto) throws JsonProcessingException {
        LoginUserDto users = usersService.checkUser(userDto.getEmail(), userDto.getPassword());
        if (users !=null){
            return ResponseEntity.ok(users);
        }
        return new ResponseEntity<>("Wrong email or password", HttpStatus.NOT_FOUND);
    }


    @PutMapping(value = "/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody UserDto userDto){
        boolean changePassword = usersService.updatePassword(userDto);
        if (changePassword){
            return ResponseEntity.ok("Password changed");
        }
        return new ResponseEntity<>("Password can not be changed", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    @PutMapping(value = "/editUser")
    public ResponseEntity<?> editUser(@RequestBody UsersDto users){
        boolean editUSer = usersService.editUser(users);
        if (editUSer)
            return ResponseEntity.ok("User updated");

        return new ResponseEntity<>("User does not exist", HttpStatus.CONFLICT);
    }

}
