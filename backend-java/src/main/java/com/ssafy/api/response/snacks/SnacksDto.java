package com.ssafy.api.response.snacks;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SnackDto {
    @ApiModelProperty(name = "스낵스 Id", example = "14")
    private Date snacksId;
    @ApiModelProperty(name = "유저 아이디", example = "0")
    private Date userId;
    @ApiModelProperty(name = "제목", example = "스낵스 영상")
    private Date snacksTitle;
    @ApiModelProperty(name = "영상", example = "")
    private String snacksContents;
    @ApiModelProperty(name = "좋아요수", example = "3")
    private int snacksLikes;
    @ApiModelProperty(name = "날짜", example = "2022-09-12")
    private int snacksRegdate;
}
