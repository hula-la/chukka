package com.ssafy.api.request.game;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GamePostReq {

    @ApiModelProperty(name = "회원 아이디", example = "user1")
    Long songId;
    @ApiModelProperty(name = "점수", example = "50")
    int score;

}
