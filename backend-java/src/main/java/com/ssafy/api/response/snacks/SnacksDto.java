package com.ssafy.api.response.snacks;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SnacksDto {
    @ApiModelProperty(name = "스낵스 Id", example = "14")
    private int snacksId;
    @ApiModelProperty(name = "유저 아이디", example = "0")
    private String userId;
    @ApiModelProperty(name = "제목", example = "스낵스 영상")
    private String snacksTitle;
    @ApiModelProperty(name = "영상내용", example = "영상 내용")
    private String snacksContents;
    @ApiModelProperty(name = "좋아요수", example = "3")
    private int snacksLikes;
    @ApiModelProperty(name = "날짜", example = "2022-09-12")
    private Date snacksRegdate;
    @ApiModelProperty(name = "태그", example = "춤,나연")
    private String snacksTag;
    @ApiModelProperty(name = "비디오", example = "img/profile.png")
    private MultipartFile snacksVideo;
}
