package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Enroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int enrollId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lec_id")
    private Lecture lecture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    private int status; // 0 : 수강중, 1 :  수강완료(라이브)
    // 연령대별 그룹
    private int ageGroup;
}
