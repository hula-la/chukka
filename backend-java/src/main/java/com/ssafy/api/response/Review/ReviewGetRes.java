package com.ssafy.api.response.Review;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Review;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@ApiModel("ReviewGetResponse")
public class ReviewGetRes {

    @ApiModelProperty(value = "리뷰 ID", example = "1, 2")
    private int reviewId;
    @ApiModelProperty(value = "유저 닉네임", example = "user_nickname")
    private String userNickname;
    @ApiModelProperty(value = "리뷰 등록일", example = "review_regdate")
    private Date reviewRegdate;
    @ApiModelProperty(value = "리뷰 점수", example = "1, 2")
    private int reviewScore;
    @ApiModelProperty(value = "리뷰 내용", example = "review_contents")
    private String reviewContents;

    public static ReviewGetRes of(int reviewId,
                                  String userNickname,
                                  Date reviewRegdate,
                                  int reviewScore,
                                  String reviewContents) {
        ReviewGetRes res = new ReviewGetRes();
        res.setReviewId(reviewId);
        res.setUserNickname(userNickname);
        res.setReviewRegdate(reviewRegdate);
        res.setReviewScore(reviewScore);
        res.setReviewContents(reviewContents);
        return res;
    }
}
