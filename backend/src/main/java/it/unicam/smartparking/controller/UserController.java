package it.unicam.smartparking.controller;


import it.unicam.smartparking.dto.LoginUserDto;
import it.unicam.smartparking.dto.UserDto;
import it.unicam.smartparking.dto.UsersDto;
import it.unicam.smartparking.model.Roles;
import it.unicam.smartparking.model.Users;
import it.unicam.smartparking.service.RolesService;
import it.unicam.smartparking.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UsersService usersService;

    @Autowired
    private RolesService rolesService;

    @GetMapping(value = "/test")
    public ResponseEntity<?> test(){


        return ResponseEntity.ok("Test");
    }


    @GetMapping(value = "/users")
    public ResponseEntity<?> getUsers(){

        List<UsersDto> users = usersService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveUser(@RequestBody Users users){

        Users user = usersService.getUserByEmail(users.getEmail());

        System.out.println("User found: " + user);

        if (user == null){
            Users usersModel = new Users();
            usersModel.setName(users.getName());
            usersModel.setLastName(users.getLastName());
            usersModel.setEmail(users.getEmail());
            usersModel.setPassword(users.getPassword());
            usersModel.setDisabled(users.getDisabled());

            Set<Roles> rolesSet = new HashSet<>();
            Roles roles = rolesService.getRolesByName("Driver");
            rolesSet.add(roles);
            usersModel.setUserRoles((rolesSet));

            usersService.saveUser(usersModel);

            return ResponseEntity.ok("User Saved Successfully");
        }
        return new ResponseEntity<>("User already exist", HttpStatus.CONFLICT);
    }

    @PutMapping(value = "/editUser")
    public ResponseEntity<?> editUser(@RequestBody UsersDto users){

        System.out.println("editUser" + users);
        Boolean editUSer = usersService.editUSer(users);
        if (editUSer)
            return ResponseEntity.ok("User Saved Successfully");

        return new ResponseEntity<>("User does not exist", HttpStatus.CONFLICT);

    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> checkUser(@RequestBody UserDto userDto){

        LoginUserDto users = usersService.checkUser(userDto.getEmail(), userDto.getPassword());

        if (users !=null){

            return ResponseEntity.ok(users);
        }

        return new ResponseEntity<>("Email and Password are wrong", HttpStatus.NOT_FOUND);

    }


    @PutMapping(value = "/changePassword")
    public ResponseEntity<?> editUser(@RequestBody UserDto userDto){

        System.out.println("update password" + userDto);
        Boolean changePassword = usersService.updatePassword(userDto);

        if (changePassword){

            return ResponseEntity.ok("Password changed");
        }

        return new ResponseEntity<>("Password can not be changed", HttpStatus.UNPROCESSABLE_ENTITY);

    }


}
