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
public class Section{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sec_id")
    private int sec_id;

    @ManyToOne
    @JoinColumn(name = "lec_id")
    private Lecture lecture;

    @ManyToOne
    @JoinColumn(name = "ins_id")
    private Instructor instructor;

    private String sec_title;
    private String sec_contents;

    @Temporal(TemporalType.DATE)
    private Date sec_regdate;

    @OneToMany(mappedBy = "section")
    private List<SectionLike> sectionLikes = new ArrayList<>();

}
