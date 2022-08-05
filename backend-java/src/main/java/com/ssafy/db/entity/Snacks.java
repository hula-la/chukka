package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;



@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Snacks{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int snacksId;

    private String snacksTitle;
    private String snacksContents;
//    private int snacksViews;
//    private int snacksLikes;

    @Temporal(TemporalType.DATE)
    private Date snacksRegdate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    // Snacks 좋아요!
    @OneToMany(mappedBy = "snacks")
    private List<SnacksHeart> snacksLikes = new ArrayList<>();

    @OneToMany(mappedBy = "snacks")
    private List<SnacksTag> snacksTag = new ArrayList<>();


}
