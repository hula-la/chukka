package com.ssafy.api.response.game;

import com.ssafy.api.response.admin.UserRes;
import com.ssafy.db.entity.Game;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Getter
@Setter
public class GameRes {


    @ApiModelProperty(name = "노래 아이디")
    private long songId;
    @ApiModelProperty(name="유저 이름")
    private String songName;
    @ApiModelProperty(name="유저 이름")
    private String singer;
    @ApiModelProperty(name="게임 난이도")
    private int level;
    @ApiModelProperty(name="최고 점수")
    private int highScore;

    public static GameRes of(Game game, int highScore) {
        GameRes res = new GameRes();
        res.setSongId(game.getSongId());
        res.setSongName(game.getSongName());
        res.setSinger(game.getSinger());
        res.setLevel(game.getLevel());
        res.setHighScore(highScore);
        return res;
    }

}
