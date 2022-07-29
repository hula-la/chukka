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
    @Column(name = "insId")
    private String insId;

    private String insName;
    private String insEmail;
    private String insProfile;
    private String insIntroduce;

    @OneToMany(mappedBy = "instructor")
    private List<Lecture> lectures = new ArrayList<>();

    @OneToMany(mappedBy = "instructor")
    private List<Section> sections = new ArrayList<>();

}
