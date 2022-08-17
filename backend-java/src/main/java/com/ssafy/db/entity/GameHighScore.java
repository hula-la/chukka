package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GameHighScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gameHighScore")
    private Long gameHighScoreId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "songId")
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;


    private int score;
}
