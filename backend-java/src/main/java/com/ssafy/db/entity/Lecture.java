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

    private String lecTitle;
    private String lecContents;
    private int lecPrice;
    private String lecNotice;
    private String thumbnail;

    @Temporal(TemporalType.DATE)
    private Date lecStartDate;

    @Temporal(TemporalType.DATE)
    private Date lec_end_date;

    private int lec_category;
    private int lec_level;
    private int lec_limit;
    private String lec_genre;

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
