package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    private String lecTitle;
    private String lecContents;
    private int lecPrice;
    private String lecThumb;
    @Temporal(TemporalType.DATE)
    @CreatedDate
    private Date lecRegDate;
    private int lecLevel;
    private String lecGenre;

    // 0. 라이브 1. 녹화
    private int lecCategory;

    // 라이브
    private String lecNotice;
    private String lecSchedule;
    private String dayAndTime;
    @Temporal(TemporalType.DATE)
    private Date lecStartDate;
    @Temporal(TemporalType.DATE)
    private Date lecEndDate;
    private int lecLimit;
    @Builder.Default
    private int lecStudent = 0;

    @Builder.Default
    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    private List<CartItem> cartItems = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Enroll> enrolls = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<PayList> payLists = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Section> sections = new ArrayList<>();

}
