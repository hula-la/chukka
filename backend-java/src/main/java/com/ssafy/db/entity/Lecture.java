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

    @ManyToOne
    @JoinColumn(name = "ins_id")
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

    private int lecCategory;
    private int lecLevel;
    private int lecLimit;
    private Integer lecStudent;
    private String lecGenre;

    @OneToMany(mappedBy = "lecture")
    @JsonIgnore
    private List<Cart> carts = new ArrayList<>();

    @OneToMany(mappedBy = "lecture")
    @JsonIgnore
    private List<Enroll> enrolls = new ArrayList<>();

    @OneToMany(mappedBy = "lecture")
    @JsonIgnore
    private List<PayList> payLists = new ArrayList<>();

    @OneToMany(mappedBy = "lecture")
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "lecture")
    @JsonIgnore
    private List<Section> sections = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        this.lecStudent = this.lecStudent == null ? 0 : this.lecStudent;
    }
}
