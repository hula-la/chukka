package com.ssafy.api.controller;

import com.ssafy.api.request.SectionLike.SectionLikeReq;
import com.ssafy.api.request.section.SectionPostReq;
import com.ssafy.api.request.section.SectionUpdateReq;
import com.ssafy.api.response.section.SectionUpdateRes;
import com.ssafy.api.service.SectionLikeService;
import com.ssafy.api.service.SectionService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;
import com.ssafy.db.entity.SectionLike;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            @PathVariable @ApiParam(value = "섹션 조회", required = true) int lecId) {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", sectionService.getSectionByLecId(lecId)));
    }

    @PostMapping("/{secId}")
    @ApiOperation(value = "좋아요/취소", notes = "좋아요 여부를 판단해 엔티티에 추가/삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success")
    })
    public ResponseEntity<BaseResponseBody> pushLike(@RequestBody @ApiParam(value = "좋아요 버튼 클릭 시", required = true) SectionLikeReq sectionLikeReq) {
        SectionLike like = sectionLikeService.pushLike(sectionLikeReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"Success", null));
    }
}
