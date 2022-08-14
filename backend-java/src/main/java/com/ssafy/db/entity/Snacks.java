package com.ssafy.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

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
    @Column(name = "snacksId", columnDefinition="bigint")
    private Long snacksId;

    private String snacksTitle;
    private String snacksContents;
    @Builder.Default
    private Long snacksLikeCnt = 0L;

    @Temporal(TemporalType.DATE)
    @CreatedDate
    private Date snacksRegdate;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @Builder.Default
    @OneToMany(mappedBy = "snacks", cascade = CascadeType.ALL)
    private List<SnacksLike> snacksLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "snacks", cascade = CascadeType.ALL)
    private List<SnacksTag> snacksTags = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "snacks", cascade = CascadeType.ALL)
    private List<SnacksReply> snacksReplies = new ArrayList<>();

}
