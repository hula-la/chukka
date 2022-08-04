package com.ssafy.db.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Getter
@Setter
public class Enroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int enrollId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lec_id")
    private Lecture lecture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

}
