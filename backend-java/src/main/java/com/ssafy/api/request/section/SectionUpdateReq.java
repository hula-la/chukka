package com.ssafy.api.request.section;

import com.ssafy.db.entity.Instructor;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("SectionUpdateRequest")
public class SectionUpdateReq {

    @ApiModelProperty(name = "섹션 ID",example = "section_id")
    int secId;
    @ApiModelProperty(name = "강사 정보",example = "InstructorInfo")
    Instructor instructor;
    @ApiModelProperty(name = "섹션 제목",example = "section_title")
    String secTitle;
    @ApiModelProperty(name = "섹션 내용",example = "section_contents")
    String secContents;
}
