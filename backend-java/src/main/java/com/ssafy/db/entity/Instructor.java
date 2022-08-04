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

    @OneToMany(mappedBy = "instructor", fetch = FetchType.LAZY)
    private List<Lecture> lectures = new ArrayList<>();

    @OneToMany(mappedBy = "instructor")
    private List<Section> sections = new ArrayList<>();

}
