package com.ssafy.api.controller;

import com.ssafy.api.request.review.ReviewPostReq;
import com.ssafy.api.response.Review.ReviewGetRes;
import com.ssafy.api.service.ReviewService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Review;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "대강의 리뷰 API", tags = {"Review"})
@RestController
@RequestMapping("/reviews")
public class ReviewController {

    // 리뷰 작성 ========================================================================================================
    @Autowired
    ReviewService reviewService;

    @PostMapping("/{lecId}")
    @ApiOperation(value = "리뷰 작성", notes = "리뷰를 작성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<BaseResponseBody> createReview(
            @ApiIgnore Authentication authentication,
            @PathVariable@ApiParam(value = "리뷰를 생성하는 강의정보", required = true) int lecId,
            @RequestBody @ApiParam(value = "리뷰 작성 정보", required = true) ReviewPostReq reviewPostReq) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        reviewService.createReview(lecId, userId, reviewPostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
    }

    // 강의별 리뷰 조회 ==================================================================================================
    @GetMapping("/{lecId}")
    @ApiOperation(value = "리뷰 조회", notes = "강의별 전체 리뷰를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ReviewGetRes.class)
    })
    public ResponseEntity<BaseResponseBody> findByLecId(
            @PathVariable @ApiParam(value = "강의에 달려 있는 리뷰", required = true) int lecId, Pageable pageable) {
        Page<ReviewGetRes> review = reviewService.findByLecId(lecId, pageable);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", review));
    }

    @DeleteMapping("/{reviewId}")
    @ApiOperation(value = "리뷰 삭제", notes = "리뷰를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<BaseResponseBody> deleteByReviewId(
            @PathVariable @ApiParam(value = "삭제할 리뷰 ID", required = true) int reviewId) {
        reviewService.deleteByReviewId(reviewId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(204, "No Content", null));
    }
}
