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
    private int review_id;

    @ManyToOne
    @JoinColumn(name = "lec_id")
    private Lecture lecture;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private int review_score;

    @Temporal(TemporalType.DATE)
    private Date review_regdate;

    private String review_contents;

}
