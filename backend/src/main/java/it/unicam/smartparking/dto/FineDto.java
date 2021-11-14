package it.unicam.smartparking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FineDto {
    private String date;
    private String parkingLot;
    private int cost;
    private String name;
    private String description;
    private int id;

}
