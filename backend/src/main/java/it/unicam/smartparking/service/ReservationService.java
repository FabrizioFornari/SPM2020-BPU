package it.unicam.smartparking.service;

import it.unicam.smartparking.model.Reservation;

import java.util.List;


public interface ReservationService {

    public List<Reservation> getAllReservations();
    public void saveReservation(Reservation reservation);
    public void updateReservation(Reservation reservation);
    public void deleteReservation(Integer id);

}
