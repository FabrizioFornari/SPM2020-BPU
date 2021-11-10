package it.unicam.smartparking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Fine
{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer fineId;

    private Integer amountOfFine;

    @Column(nullable = true)
    private boolean seenDriver;

    @Column(nullable = true)
    private boolean seenAdmin;

    private String description;

    private String date;
}
