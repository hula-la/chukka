package com.ssafy.db.entity;

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
public class Section{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sec_id")
    private int secId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lec_id")
    private Lecture lecture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ins_id")
    private Instructor instructor;

    private String secTitle;
    private String secContents;

    @Temporal(TemporalType.DATE)
    @CreatedDate
    private Date secRegDate;


    @OneToMany(mappedBy = "section")
    private List<SectionLike> sectionLikes = new ArrayList<>();

}
