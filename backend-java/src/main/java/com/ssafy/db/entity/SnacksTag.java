package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class SnacksTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int SnacksTagId;

    @ManyToOne
    @JoinColumn(name = "snacks_id")
    Snacks snacks;


}
