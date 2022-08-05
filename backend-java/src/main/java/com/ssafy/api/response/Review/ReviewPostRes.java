package com.ssafy.api.response.Review;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ReviewPostResponse")
public class ReviewPostRes {

    @ApiModelProperty(name = "리뷰 ID", example = "review_id")
    int reviewId;
    @ApiModelProperty(name = "강의 ID", example = "lecture_id")
    int lecId;
    @ApiModelProperty(name = "유저 ID", example = "user_id")
    String userId;
    @ApiModelProperty(name = "평점", example = "1~5")
    int reviewScore;
    @ApiModelProperty(name = "리뷰내용", example = "이 강의 진짜 좋네요")
    String reviewContents;

    public static ReviewPostRes of(int reviewId,
                                   int lecId,
                                   String userId,
                                   int reviewScore,
                                   String reviewContents) {

        ReviewPostRes res = new ReviewPostRes();
        res.setReviewId(reviewId);
        res.setLecId(lecId);
        res.setUserId(userId);
        res.setReviewScore(reviewScore);
        res.setReviewContents(reviewContents);
        return res;
    }
}
