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
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private RolesRepository rolesRepository;
    @Autowired
    private RolesService rolesService;
    @Autowired
    private JwtProvider jwtProvider;


    public List<UsersDto> getAllUsers() {
        List<Users> users = (List<Users>) usersRepository.findAll();
        List<UsersDto> usersDtos = new ArrayList<>();
        users.forEach(user ->{
            UsersDto usersDto = new UsersDto();
            BeanUtils.copyProperties(user, usersDto);
            usersDto.setId(user.getUserId());
            List<String> roles = new ArrayList<>();
            for (Roles role: user.getUserRoles()) {
                roles.add(role.getRoleName());
            }
            usersDto.setRoles(roles.toArray(new String[0]));
            usersDtos.add(usersDto);
        } );
        return usersDtos;
    }

    public void saveUser(Users users) {
        Users usersModel = new Users();
        BeanUtils.copyProperties(users, usersModel);
        usersModel.getUserRoles().add(rolesService.getRolesByName("Driver"));
        usersRepository.save(users);
    }

    public boolean editUser(UsersDto users) {

        Users user = usersRepository.findByEmail(users.getEmail());
        if (user != null){
            user.setName(users.getName());
            user.setLastName(users.getLastName());
            if (Objects.isNull(users.getDisabled())) {
                user.setDisabled(false);
            } else {
                user.setDisabled(users.getDisabled());
            }
            if (users.getRoles() != null){
                Set<Roles> rolesSet = new HashSet<>();
                for (String role: users.getRoles()) {
                    Roles roles = rolesRepository.findByRoleName(role);
                    rolesSet.add(roles);
                }
                user.setUserRoles(rolesSet);
            }
            usersRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean updatePassword(UserDto userDto) {

        Users users = usersRepository.findByEmailAndPassword(userDto.getEmail(), userDto.getPassword());
        if (users !=null){
            users.setPassword(userDto.getNewPassword());
            usersRepository.save(users);
            return true;
        }
        return false;
    }

    public Users getUserByEmail(String email) {
        return usersRepository.findByEmail(email);
    }
    public LoginUserDto checkUser(String email, String password) throws JsonProcessingException {
        Users user = usersRepository.findByEmailAndPassword(email, password);
        LoginUserDto loginUserDto =  null;
        if (user != null) {
            loginUserDto = new LoginUserDto();
            loginUserDto.setId(user.getUserId());
            loginUserDto.setName(user.getName());
            loginUserDto.setLastName(user.getLastName());
            loginUserDto.setEmail(user.getEmail());
            loginUserDto.setDisabled(user.getDisabled() ? "Yes" : "No");
            Set<Integer> rolesSet = new HashSet<>();
            Set<String> rolesStringSet = new HashSet<>();
            for (Roles role : user.getUserRoles()) {
                rolesSet.add(role.getRoleId());
                rolesStringSet.add(role.getRoleName());
            }
            loginUserDto.setRoles((rolesSet.toArray(new Integer[0])));
            loginUserDto.setRolesString((rolesStringSet.toArray(new String[0])));
            loginUserDto.setToken(jwtProvider.createJwt(user));
        }
        return loginUserDto;
    }

}
