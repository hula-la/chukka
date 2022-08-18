package com.ssafy.api.controller;

import com.ssafy.api.service.SectionLikeService;
import com.ssafy.api.service.SectionService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;


@Api(value = "강의 섹션 API", tags = {"Section"})
@RestController
@RequestMapping("/sections")
public class SectionController {

    @Autowired
    SectionService sectionService;

    @Autowired
    SectionLikeService sectionLikeService;

    // 강의별 섹션 조회 ==================================================================================================
    @GetMapping("/{lecId}")
    @ApiOperation(value = "섹션 조회", notes = "강의별 섹션을 불러온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success")
    })
    public ResponseEntity<BaseResponseBody> findByLecId(
            @PathVariable @ApiParam(value = "섹션 조회", required = true) int lecId,
            Pageable pageable) {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", sectionService.getSectionByLecId(lecId, pageable)));
    }

    @PostMapping("/{secId}")
    @ApiOperation(value = "좋아요/취소", notes = "좋아요 여부를 판단해 엔티티에 추가/삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success")
    })
    public ResponseEntity<BaseResponseBody> pushLike(
            @ApiIgnore Authentication authentication,
            @PathVariable@ApiParam(value = "좋아요 기능 사용할 섹션", required = true) int secId,
            @RequestBody @ApiParam(value = "좋아요 ID", required = true) int likeId) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        sectionLikeService.pushLike(secId, userId, likeId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"Success", null));
    }
}
