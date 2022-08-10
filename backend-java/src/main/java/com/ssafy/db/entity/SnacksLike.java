package com.ssafy.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SnacksLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int snacksLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snacksId")
    Snacks snacks;

    @Temporal(TemporalType.DATE)
    @CreatedDate
    Date likeSnacksReg;

}
