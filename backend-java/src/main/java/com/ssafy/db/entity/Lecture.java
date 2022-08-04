package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "insId")
    private Instructor instructor;
    private String thumbnail;
    private String lecTitle;
    private String lecContents;
    private int lecPrice;
    private String lecNotice;

    @Temporal(TemporalType.DATE)
    private Date lecStartDate;

    @Temporal(TemporalType.DATE)
    private Date lecEndDate;
    // 0. 라이브 1. 녹화
    private int lecCategory;
    private int lecLevel;
    private int lecLimit;
    private Integer lecStudent;
    private String lecGenre;

    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    private List<CartItem> cartItems = new ArrayList<>();

    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Enroll> enrolls = new ArrayList<>();

    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<PayList> payLists = new ArrayList<>();

    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Section> sections = new ArrayList<>();


}
