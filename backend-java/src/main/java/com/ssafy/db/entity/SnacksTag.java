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
public class SnacksTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int SnacksTagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snacks_id")
    Snacks snacks;

    String snacksTagContent;

    @Temporal(TemporalType.DATE)
    @CreatedDate
    Date snacksRegdate;

}
