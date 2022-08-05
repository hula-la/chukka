package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

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

}
