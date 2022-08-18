package com.ssafy.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
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
    private String secVideoUrl;

    @Temporal(TemporalType.DATE)
    @CreatedDate
    private Date secRegDate;

    @OneToMany(mappedBy = "section")
    private List<SectionLike> sectionLikes = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        this.secRegDate = this.secRegDate == null ? Calendar.getInstance().getTime() : this.secRegDate;
    }

}
