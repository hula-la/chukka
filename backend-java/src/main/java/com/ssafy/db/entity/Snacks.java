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
    private Long snacksId;

    private String snacksTitle;
    private String snacksContents;
//    private int snacksViews;
//    private int snacksLikes;

    @Temporal(TemporalType.DATE)
    private Date snacksRegdate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @Builder.Default
    @OneToMany(mappedBy = "snacks")
    private List<SnacksLike> snacksLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "snacks")
    private List<SnacksTag> snacksTags = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "snacks")
    private List<SnacksReply> snacksReplies = new ArrayList<>();

}
