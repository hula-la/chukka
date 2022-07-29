package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
public class SnacksLike{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int snackslike_id;

    @ManyToOne
    @JoinColumn(name = "userId")
    User user;

    @ManyToOne
    @JoinColumn(name = "snacks_id")
    Snacks snacks;

    @Temporal(TemporalType.DATE)
    Date like_snacks_reg;
}
