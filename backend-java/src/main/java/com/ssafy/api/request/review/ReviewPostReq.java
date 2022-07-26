package com.ssafy.api.request.review;

import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@ApiModel("ReviewPostRequest")
public class ReviewPostReq {

    @ApiModelProperty(name = "리뷰 ID", example = "review_id")
    int reviewId;
    @ApiModelProperty(name = "강의 ID", example = "lec_id")
    Lecture lecture;
    @ApiModelProperty(name = "유저 ID", example = "user_id")
    User user;
    @ApiModelProperty(name = "평점", example = "1~5")
    int reviewScore;
    @ApiModelProperty(name = "등록일", example = "2020-10-10")
    Date reviewRegdate;
    @ApiModelProperty(name = "리뷰내용", example = "이 강의 진짜 좋네요")
    String reviewContents;

}
