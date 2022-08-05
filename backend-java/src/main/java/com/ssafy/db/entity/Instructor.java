package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class Instructor{

    @Id
    @Column(name = "insId")
    private String insId;

    private String insName;
    private String insEmail;
    private String insIntroduce;
    private String insProfile;

    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
    private List<Lecture> lectures = new ArrayList<>();

    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
    private List<Section> sections = new ArrayList<>();

}
