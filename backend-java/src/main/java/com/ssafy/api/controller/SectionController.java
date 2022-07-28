package com.ssafy.api.controller;

import com.ssafy.api.request.section.SectionPostReq;
import com.ssafy.api.service.SectionService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "강의 섹션 API", tags = {"Section"})
@RestController
@RequestMapping("/lecture")
public class SectionController {

    @Autowired
    SectionService sectionService;

    // 섹션 생성 ========================================================================================================
    @PostMapping("/")
    @ApiOperation(value = "소강의 생성", notes = "해당하는 대강의에 소강의를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success")
    })
    public ResponseEntity<? extends BaseResponseBody> createSection (
            @RequestBody @ApiParam(value = "섹션 생성 시 필요한 정보", required = true) SectionPostReq sectionPostReq) {
        Section section = sectionService.createSection(sectionPostReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 강의별 섹션 조회 ==================================================================================================
    @GetMapping("/")
    @ApiOperation(value = "섹션 조회", notes = "강의별 섹션을 불러온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success")
    })
    public ResponseEntity<List<Section>> findByLectureOrderBySecId(Lecture lecture) {
        return ResponseEntity.ok(sectionService.findByLectureOrderBySecId(lecture));
    }
}
