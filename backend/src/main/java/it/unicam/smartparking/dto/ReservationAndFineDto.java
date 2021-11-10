package it.unicam.smartparking.dto;

import lombok.Data;

@Data
public class ReservationAndFineDto {

    private Integer id;

    private String parkingTicket;

    private Integer fine;

    private String email;

    private String fullName;

    private String description;

    private String date;

    private String parkingLot;
}
