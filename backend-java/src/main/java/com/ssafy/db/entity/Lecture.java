package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Lecture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lec_id")
    private int lecId;

    @ManyToOne
    @JoinColumn(name = "ins_id")
    private Instructor instructor;

<<<<<<< HEAD
    private String thumbnail;

=======
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c
    private String lecTitle;
    private String lecContents;
    private int lecPrice;
    private String lecNotice;
<<<<<<< HEAD
=======
    private String thumbnail;
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c

    @Temporal(TemporalType.DATE)
    private Date lecStartDate;

    @Temporal(TemporalType.DATE)
<<<<<<< HEAD
    private Date lecEndDate;

    private int lecCategory;
    private int lecLevel;
    private int lecLimit;
    private String lecGenre;
=======
    private Date lec_end_date;

    private int lec_category;
    private int lec_level;
    private int lec_limit;
    private String lec_genre;
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c

    @OneToMany(mappedBy = "lecture")
    private List<Cart> carts = new ArrayList<>();

    @OneToMany(mappedBy = "lecture")
    private List<Enroll> enrolls = new ArrayList<>();

    @OneToMany(mappedBy = "lecture")
    private List<PayList> payLists = new ArrayList<>();

    @OneToMany(mappedBy = "lecture")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "lecture")
    private List<Section> sections = new ArrayList<>();

}
