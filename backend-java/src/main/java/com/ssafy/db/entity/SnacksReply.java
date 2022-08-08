package com.ssafy.db.entity;

import lombok.*;
import org.checkerframework.checker.units.qual.C;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SnacksReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int replyId;

    @Temporal(TemporalType.DATE)
    @CreatedDate
    Date replyRegdate;

    private String contents;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snacksId")
    Snacks snacks;

}
