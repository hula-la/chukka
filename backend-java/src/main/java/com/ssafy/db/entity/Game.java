package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "songId")
    private Long songId;

    private String songName;

    private String singer;

    private int level;

    @Builder.Default
    @OneToMany(mappedBy = "game",cascade = CascadeType.ALL)
    private List<GameHighScore> gameHighScores = new ArrayList<>();


}
