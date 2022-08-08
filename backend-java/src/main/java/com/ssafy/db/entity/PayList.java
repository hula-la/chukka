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
    private int paylistId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payId")
    private Pay pay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecId")
    private Lecture lecture;

}
