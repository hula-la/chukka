package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Instructor{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ins_id")
    private int ins_id;

    private String ins_name;
    private String ins_email;
    private String ins_profile;
    private String ins_introduce;

    @OneToMany(mappedBy = "instructor")
    private List<Lecture> lectures = new ArrayList<>();

    @OneToMany(mappedBy = "instructor")
    private List<Section> sections = new ArrayList<>();

}
