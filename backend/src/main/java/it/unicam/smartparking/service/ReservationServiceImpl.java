package it.unicam.smartparking.service;

import it.unicam.smartparking.model.Reservation;
import it.unicam.smartparking.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;


    @Override
    public List<Reservation> getAllReservations() {
        return (List<Reservation>) reservationRepository.findAll();
    }

    @Override
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

    @Override
    public void updateReservation(Reservation reservation) {

        reservationRepository.save(reservation);
    }

    @Override
    public void deleteReservation(Integer id) {
        reservationRepository.deleteById(id);
    }
}
