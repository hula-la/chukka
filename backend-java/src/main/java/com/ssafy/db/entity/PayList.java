package com.ssafy.db.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Getter
@Setter
public class PayList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paylist_id;

    @ManyToOne
    @JoinColumn(name = "pay_id")
    private Pay pay;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "lec_id")
    private Lecture lecture;

}
