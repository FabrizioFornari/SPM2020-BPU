package it.unicam.smartparking.service;

import it.unicam.smartparking.repository.RolesRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(SpringExtension.class)
class RolesServiceTest {

    @Mock
    private RolesRepository rolesRepository;
    @InjectMocks
    private RolesService rolesService;

    @Test
    void getRolesByName() {
        rolesService.getRolesByName("Driver");
        verify(rolesRepository, times(1)).findByRoleName(any());

    }
}