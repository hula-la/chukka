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

    @ApiModelProperty(name = "강의 ID", example = "lecture_id")
    int lecId;
    @ApiModelProperty(name = "평점", example = "1~5")
    int reviewScore;
    @ApiModelProperty(name = "리뷰내용", example = "이 강의 진짜 좋네요")
    String reviewContents;
}
