package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;



@Entity
@Getter @Setter
public class Snacks{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int snacksId;

    private String snacksTitle;
    private String snacksContents;
    private int snacksViews;
//    private int snacksLikes;

    @Temporal(TemporalType.DATE)
    private Date snacksRegdate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    // Snacks 좋아요!
    @OneToMany(mappedBy = "snacks")
    private List<SnacksLike> snacksLikes = new ArrayList<>();


}
