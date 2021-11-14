package it.unicam.smartparking.service;

import it.unicam.smartparking.dto.EnterExitDto;
import it.unicam.smartparking.dto.ReservationAndFineDto;
import it.unicam.smartparking.model.Fine;
import it.unicam.smartparking.model.Reservation;
import it.unicam.smartparking.repository.FineRepository;
import it.unicam.smartparking.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private FineRepository fineRepository;

    @Autowired
    private EntityManager em;

    public List<Reservation> getAllReservations() {
        return (List<Reservation>) reservationRepository.findAll();
    }

    public List<Reservation> getAllReservationsByEmail(String email) {
        return reservationRepository.findByEmail(email);
    }

    public void saveReservation(Reservation reservation) {
        Reservation reservationModel = new Reservation();
        reservationModel.setFullName(reservation.getFullName());
        reservationModel.setEmail(reservation.getEmail());
        reservationModel.setStartDate(reservation.getStartDate());
        reservationModel.setEndDate(reservation.getEndDate());
        reservationModel.setCost(reservation.getCost());
        reservationModel.setParkingLot(reservation.getParkingLot());
        reservationRepository.save(reservationModel);
    }

    public void updateReservation(Reservation reservation) {

        reservationRepository.save(reservation);
    }

    public void deleteReservation(Integer id) {
        reservationRepository.deleteById(id);
    }

    public void enter(EnterExitDto enterExitDto) {
        Reservation reservation = reservationRepository.findByIdAndEmail(enterExitDto.getId(), enterExitDto.getEmail());
        reservation.setEnterDate(enterExitDto.getDate());
        reservationRepository.save(reservation);

    }

    public void exit(EnterExitDto enterExitDto) {
        Reservation reservation = reservationRepository.findByIdAndEmail(enterExitDto.getId(), enterExitDto.getEmail());
        reservation.setExitDate(enterExitDto.getDate());
        ZonedDateTime endDateTime = ZonedDateTime.parse(reservation.getEndDate());
        ZonedDateTime exitDateTime = ZonedDateTime.parse(enterExitDto.getDate());
        if(exitDateTime.isAfter(endDateTime)) {
            Fine fine = new Fine();
            fine.setAmountOfFine(10);
            fine.setDescription("Time Limit Exceeded");
            fine.setDate(enterExitDto.getDate());
            (reservation.getReservationFine()).add(fine);
        }
        reservationRepository.save(reservation);
    }

    public Set<ReservationAndFineDto> getAllDriverFines(String email) {
        List<Reservation> reservationList = reservationRepository.findByEmail(email);
        return getReservationAndFineDtos(reservationList);
    }

    private Set<ReservationAndFineDto> getReservationAndFineDtos(List<Reservation> reservationList) {
        Set<ReservationAndFineDto> reservationAndFineDtos = new HashSet<>();

        for (Reservation reservation:reservationList) {
            if (reservation.getReservationFine().size() != 0){
                for (Fine fine:reservation.getReservationFine()) {

                    ReservationAndFineDto reservationAndFineDto = new ReservationAndFineDto();
                    reservationAndFineDto.setId(fine.getFineId());
                    reservationAndFineDto.setParkingTicket(reservation.getStartDate() + " " + reservation.getEndDate());
                    reservationAndFineDto.setFine(fine.getAmountOfFine());
                    reservationAndFineDto.setEmail(reservation.getEmail());
                    reservationAndFineDto.setFullName(reservation.getFullName());
                    reservationAndFineDto.setDescription(fine.getDescription());
                    reservationAndFineDto.setDate(fine.getDate());
                    reservationAndFineDto.setParkingLot(reservation.getParkingLot());

                    reservationAndFineDtos.add(reservationAndFineDto);

                }
            }
        }

        return reservationAndFineDtos;
    }

    public Integer getNrOfParkingViolations(String email) {
        List<Reservation> reservationList = reservationRepository.findByEmail(email);

        Integer nrOfFines = 0;
        for (Reservation reservation:reservationList) {
            if (reservation.getReservationFine().size() != 0){
                for (Fine fine:reservation.getReservationFine()) {
                    if (!fine.isSeenDriver())
                    nrOfFines ++;
                }
            }
        }
        return nrOfFines;
    }

    public void updateSeenDriverFine(String email) {

        List<Reservation> reservationList = reservationRepository.findByEmail(email);

        for (Reservation reservation:reservationList) {
            if (reservation.getReservationFine().size() != 0){
                for (Fine fine:reservation.getReservationFine()) {

                    if (!fine.isSeenDriver()){
                        Fine fineModel = fineRepository.findById(fine.getFineId()).orElse(null);
                        if (fineModel != null){
                            fineModel.setSeenDriver(true);
                            fineRepository.save(fineModel);
                        }
                    }
                }
            }
        }
    }

    public Set<ReservationAndFineDto> getAllDriversFines() {
        List<Reservation> reservationList = (List<Reservation>) reservationRepository.findAll();
        return getReservationAndFineDtos(reservationList);
    }

    public Integer getNrOfAllParkingViolations() {
        List<Reservation> reservationList = (List<Reservation>) reservationRepository.findAll();

        Integer nrOfFines = 0;
        for (Reservation reservation:reservationList) {
            if (reservation.getReservationFine().size() != 0){
                for (Fine fine:reservation.getReservationFine()) {
                    if (!fine.isSeenAdmin())
                        nrOfFines ++;
                }
            }
        }
        return nrOfFines;
    }

    public void updateSeenAdminFine() {
        List<Reservation> reservationList = (List<Reservation>) reservationRepository.findAll();

        for (Reservation reservation:reservationList) {
            if (reservation.getReservationFine().size() != 0){
                for (Fine fine:reservation.getReservationFine()) {

                    if (!fine.isSeenAdmin()){
                        Fine fineModel = fineRepository.findById(fine.getFineId()).orElse(null);
                        if (fineModel != null){
                            fineModel.setSeenAdmin(true);
                            fineRepository.save(fineModel);
                        }
                    }
                }
            }
        }
    }

    public void deleteDriversFines(Integer id) {
        try {
            fineRepository.deleteFineRelationships(id);
        }catch (Exception exception){

        }
        fineRepository.deleteById(id);
    }

    public void updateDriverFine(Integer id, Integer cost) {
        Optional<Fine> fine = fineRepository.findById(id);
        if (fine.isPresent()) {
            fine.get().setAmountOfFine(cost);
            fineRepository.save(fine.get());
        }
    }
}