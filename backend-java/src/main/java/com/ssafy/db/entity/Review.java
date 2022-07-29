package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;
<<<<<<< HEAD
import org.springframework.data.annotation.CreatedDate;
=======
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class Review{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
    private int reviewId;
=======
    private int review_id;
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c

    @ManyToOne
    @JoinColumn(name = "lec_id")
    private Lecture lecture;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

<<<<<<< HEAD
    private int reviewScore;

    @Temporal(TemporalType.DATE)
    @CreatedDate
    private Date reviewRegdate;

    private String reviewContents;
=======
    private int review_score;

    @Temporal(TemporalType.DATE)
    private Date review_regdate;

    private String review_contents;
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c

}
