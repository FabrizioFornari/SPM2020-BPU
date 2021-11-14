package it.unicam.smartparking.service;

import it.unicam.smartparking.dto.EnterExitDto;
import it.unicam.smartparking.dto.ReservationAndFineDto;
import it.unicam.smartparking.model.Fine;
import it.unicam.smartparking.model.Reservation;
import it.unicam.smartparking.repository.FineRepository;
import it.unicam.smartparking.repository.ReservationRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;

@ExtendWith(SpringExtension.class)
class ReservationServiceTest {

    @Mock
    private FineRepository fineRepository;
    @Mock
    private ReservationRepository reservationRepository;
    @InjectMocks
    private ReservationService reservationService;


    @Test
    void getAllReservations() {
        Reservation reservation1 = new Reservation(1, "Test1", "Test1@email.com", "2021-11-05T20:34:09.371Z", "2021-11-05T22:50:09.371Z", "12", "Camerino1", null, null, null);
        Reservation reservation2 = new Reservation(2, "Test2", "Test2@email.com", "2021-11-05T20:44:09.371Z", "2021-11-05T22:54:09.371Z", "12", "Camerino2", null, null, null);
        List<Reservation> reservationList = List.of(reservation1, reservation2);
        Mockito.when(reservationRepository.findAll()).thenReturn(reservationList);
        List<Reservation> allReservations = reservationService.getAllReservations();
        reservationList.forEach(reservation ->
                Assertions.assertTrue(allReservations.stream().anyMatch(r -> r.equals(reservation))));
    }

    @Test
    void getAllReservationsByEmail() {
        Reservation reservation = new Reservation(1, "Test1", "Test1@email.com", "2021-11-05T20:34:09.371Z", "2021-11-05T22:50:09.371Z", "12", "Camerino1", null, null, null);
        List<Reservation> reservationList = List.of(reservation);
        Mockito.when(reservationRepository.findByEmail(Mockito.anyString())).thenReturn(reservationList);
        List<Reservation> allReservations = reservationService.getAllReservationsByEmail("Test1@email.com");
        reservationList.forEach(reservations ->
                Assertions.assertTrue(allReservations.stream().anyMatch(r -> r.equals(reservations))));

    }

    @Test
    void saveReservation() {
        Reservation reservation = new Reservation(3, "NameTest", "user@email.com", "2021-11-05T20:34:09.371Z", "2021-11-05T22:50:09.371Z", "3", "Camerino3", null, null, null);
        reservationService.saveReservation(reservation);
        Mockito.verify(reservationRepository, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    void updateReservation() {
        Reservation reservation = new Reservation(3, "NameTest", "user@email.com", "2021-11-05T20:34:09.371Z", "2021-11-05T23:50:09.371Z", "4", "Camerino3", null, null, null);
        reservationService.updateReservation(reservation);
        Mockito.verify(reservationRepository, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    void deleteReservation() {
        reservationService.deleteReservation(3);
        Mockito.verify(reservationRepository, Mockito.times(1)).deleteById(Mockito.any());
    }

    @Test
    void enter() {
        Reservation reservation = new Reservation(3, "NameTest", "user@email.com", "2021-11-05T20:34:09.371Z", "2021-11-05T23:50:09.371Z", "4", "Camerino3", null, null, null);
        Mockito.when(reservationRepository.findByIdAndEmail(Mockito.anyInt(), Mockito.anyString())).thenReturn(reservation);
        EnterExitDto enterExitDto = new EnterExitDto(1,"2021-11-05T20:35:09.371Z","Test1@email.com");
        reservationService.enter(enterExitDto);
        Mockito.verify(reservationRepository, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    void exit() {
        Fine fine = new Fine(3,3,false,true, "Time limit exceeded","2021-11-05T23:52:09.371Z");
        Set<Fine> fines = new HashSet<>(List.of(fine));
        Reservation reservation = new Reservation(2, "NameTest", "user1@email.com", "2021-11-05T20:34:09.371Z", "2021-11-05T23:50:09.371Z", "4", "Camerino3", null, null, fines);
        Mockito.when(reservationRepository.findByIdAndEmail(Mockito.anyInt(), Mockito.anyString())).thenReturn(reservation);
        EnterExitDto enterExitDto = new EnterExitDto(1,"2021-11-05T23:51:09.371Z","Test1@email.com");
        reservationService.exit(enterExitDto);
        Mockito.verify(reservationRepository, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    void getAllDriverFines() {
        Fine fine = new Fine(1,10,false,false, "Time limit exceeded","2021-11-05T23:52:09.371Z");
        Set<Fine> fines = new HashSet<>(List.of(fine));
        Reservation reservation = new Reservation(3, "NameTest", "user@email.com", "2021-11-05T20:34:09.371Z", "2021-11-05T23:50:09.371Z", "4", "Camerino3", "2021-11-05T20:35:09.371Z", "2021-11-05T23:52:09.371Z", fines);
        List<Reservation> reservationList = List.of(reservation);
        Mockito.when(reservationRepository.findByEmail(Mockito.anyString())).thenReturn(reservationList);
        Set<ReservationAndFineDto> reservationAndFineDtos = reservationService.getAllDriverFines(Mockito.anyString());
        fines.forEach(f ->Assertions.assertTrue(reservationAndFineDtos.stream().anyMatch(reservationAndFineDto -> reservationAndFineDto.getId().equals(f.getFineId()))));
    }

    @Test
    void getNrOfParkingViolations() {
        Fine fine = new Fine(3,3,false,true, "Time limit exceeded","2021-11-05T23:52:09.371Z");
        Set<Fine> fines = new HashSet<>(List.of(fine));
        Reservation reservation = new Reservation(3, "NameTest", "user@email.com", "2021-11-05T20:34:09.371Z", "2021-11-05T23:50:09.371Z", "4", "Camerino3", "2021-11-05T20:35:09.371Z", "2021-11-05T23:52:09.371Z", fines);
        List<Reservation> reservationList = List.of(reservation);
        Mockito.when(reservationRepository.findByEmail(Mockito.anyString())).thenReturn(reservationList);
        Integer nrOfParkingViolations = reservationService.getNrOfParkingViolations(Mockito.anyString());
        Assertions.assertEquals(fines.size(), nrOfParkingViolations);
    }

    @Test
    void updateSeenDriverFine() {
        Fine fine = new Fine(3,3,false,true, "Time limit exceeded","2021-11-05T23:52:09.371Z");
        Set<Fine> fines = new HashSet<>(List.of(fine));
        Reservation reservation = new Reservation(3, "NameTest", "user@email.com", "2021-11-05T20:34:09.371Z", "2021-11-05T23:50:09.371Z", "4", "Camerino3", "2021-11-05T20:35:09.371Z", "2021-11-05T23:52:09.371Z", fines);
        List<Reservation> reservationList = List.of(reservation);
        Mockito.when(reservationRepository.findByEmail(Mockito.anyString())).thenReturn(reservationList);
        Mockito.when(fineRepository.findById(Mockito.anyInt())).thenReturn(java.util.Optional.of(fine));
        reservationService.updateSeenDriverFine(Mockito.anyString());
        Mockito.verify(fineRepository, Mockito.times(1)).save(Mockito.any());

    }

    @Test
    void getAllDriversFines() {
        Fine fine1 = new Fine(3,3,false,true, "Time limit exceeded","2021-11-05T23:52:09.371Z");
        Fine fine2 = new Fine(4,6,false,true, "Time limit exceeded","2021-11-05T23:52:11.371Z");
        Set<Fine> fines = new HashSet<>(List.of(fine1,fine2));
        Reservation reservation = new Reservation(3, "NameTest", "user@email.com", "2021-11-05T20:34:09.371Z", "2021-11-05T23:50:09.371Z", "4", "Camerino3", "2021-11-05T20:35:09.371Z", "2021-11-05T23:52:09.371Z", fines);
        List<Reservation> reservationList = List.of(reservation);
        Mockito.when(reservationRepository.findAll()).thenReturn(reservationList);
        Set<ReservationAndFineDto> reservationAndFineDtos = reservationService.getAllDriversFines();
        fines.forEach(f ->Assertions.assertTrue(reservationAndFineDtos.stream().anyMatch(reservationAndFineDto -> reservationAndFineDto.getId().equals(f.getFineId()))));
    }

    @Test
    void getNrOfAllParkingViolations() {
        Fine fine1 = new Fine(3,3,false,false, "Time limit exceeded","2021-11-05T23:52:09.371Z");
        Fine fine2 = new Fine(4,6,false,false, "Time limit exceeded","2021-11-05T23:52:11.371Z");
        Set<Fine> fines = new HashSet<>(List.of(fine1,fine2));
        Reservation reservation = new Reservation(3, "NameTest", "user@email.com", "2021-11-05T20:34:09.371Z", "2021-11-05T23:50:09.371Z", "4", "Camerino3", "2021-11-05T20:35:09.371Z", "2021-11-05T23:52:09.371Z", fines);
        List<Reservation> reservationList = List.of(reservation);
        Mockito.when(reservationRepository.findAll()).thenReturn(reservationList);
        Integer nrOfParkingViolations = reservationService.getNrOfAllParkingViolations();
        Assertions.assertEquals(fines.size(), nrOfParkingViolations);
    }

    @Test
    void updateSeenAdminFine() {
        Fine fine = new Fine(3,3,false,false, "Time limit exceeded","2021-11-05T23:52:09.371Z");
        Set<Fine> fines = new HashSet<>(List.of(fine));
        Reservation reservation = new Reservation(3, "NameTest", "user@email.com", "2021-11-05T20:34:09.371Z", "2021-11-05T23:50:09.371Z", "4", "Camerino3", "2021-11-05T20:35:09.371Z", "2021-11-05T23:52:09.371Z", fines);
        List<Reservation> reservationList = List.of(reservation);
        Mockito.when(reservationRepository.findAll()).thenReturn(reservationList);
        Mockito.when(fineRepository.findById(Mockito.anyInt())).thenReturn(java.util.Optional.of(fine));
        reservationService.updateSeenAdminFine();
        Mockito.verify(fineRepository, Mockito.times(1)).save(Mockito.any());

    }

    @Test
    void deleteDriversFines() {
        reservationService.deleteDriversFines(3);
        Mockito.verify(fineRepository, Mockito.times(1)).deleteById(Mockito.any());
    }

    @Test
    void shouldNotDeleteDriversFines() {
        doThrow(new RuntimeException()).when(fineRepository).deleteFineRelationships(Mockito.anyInt());
        doNothing().when(fineRepository).deleteById(Mockito.anyInt());
        reservationService.deleteDriversFines(3);
        Mockito.verify(fineRepository, Mockito.times(1)).deleteById(Mockito.any());
    }

    @Test
    void updateDriverFine() {

        Mockito.when(fineRepository.findById(Mockito.anyInt())).thenReturn(java.util.Optional.of(new Fine(1, 10, true, true, "", "")));
        reservationService.updateDriverFine(1,5);
        Mockito.verify(fineRepository, Mockito.times(1)).save(Mockito.any());

    }
}