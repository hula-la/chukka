package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;
<<<<<<< HEAD
import org.springframework.data.annotation.CreatedDate;
=======
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c

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
<<<<<<< HEAD
    private int secId;
=======
    private int sec_id;
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c

    @ManyToOne
    @JoinColumn(name = "lec_id")
    private Lecture lecture;

    @ManyToOne
    @JoinColumn(name = "ins_id")
    private Instructor instructor;

<<<<<<< HEAD
    private String secTitle;
    private String secContents;

    @Temporal(TemporalType.DATE)
    @CreatedDate
    private Date secRegdate;
=======
    private String sec_title;
    private String sec_contents;

    @Temporal(TemporalType.DATE)
    private Date sec_regdate;
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c

    @OneToMany(mappedBy = "section")
    private List<SectionLike> sectionLikes = new ArrayList<>();

}
