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
<<<<<<< HEAD
    private int snacks_id;
=======
    private int snacksId;
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c

    private String snacks_title;
    private String snacks_contents;
    private int snacks_views;
    private int snacks_likes;

    @Temporal(TemporalType.DATE)
    private Date snacks_regdate;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    // Snacks 좋아요!
    @OneToMany(mappedBy = "snacks")
    private List<SnacksLike> snacksLikes = new ArrayList<>();

}
