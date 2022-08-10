package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PayList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paylistId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payId")
    private Pay pay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecId")
    private Lecture lecture;

    private String merchant_uid;
}
