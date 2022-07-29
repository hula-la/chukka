package com.ssafy.api.request.section;

import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("SectionPostRequest")
public class SectionPostReq {

    @ApiModelProperty(name = "섹션 ID", example = "1, 2 ..")
    int secId;
    @ApiModelProperty(name = "lecture 정보", example = "lecture~")
    Lecture lecture;
    @ApiModelProperty(name = "강사 정보", example = "instructor~")
    Instructor instructor;
    @ApiModelProperty(name = "섹션 제목", example = "파트 1")
    String secTitle;
    @ApiModelProperty(name = "섹션 내용", example = "솰라솰라 배워보아요~")
    String secContents;

}
