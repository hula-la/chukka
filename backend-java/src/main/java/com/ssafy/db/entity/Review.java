package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class Review{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;

    @ManyToOne
    @JoinColumn(name = "lec_id")
    private Lecture lecture;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private int reviewScore;

    @Temporal(TemporalType.DATE)
    private Date reviewRegdate;

    private String reviewContents;

}
