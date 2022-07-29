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
<<<<<<< HEAD
    private int enroll_id;

    @ManyToOne
    @JoinColumn(name = "lec_id")
//    @JoinColumn(name = "ins_id")
=======
    private int enrollId;

    @ManyToOne
    @JoinColumn(name = "lec_id")
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c
    private Lecture lecture;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}
