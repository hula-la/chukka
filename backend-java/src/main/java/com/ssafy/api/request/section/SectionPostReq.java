package com.ssafy.api.request.section;

import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ApiModel("SectionPostRequest")
public class SectionPostReq {

    @ApiModelProperty(name = "lecture 아이디", example = "1")
    int lecId;
    @ApiModelProperty(name = "강사 아이디", example = "instructor_id")
    String insId;
    @ApiModelProperty(name = "섹션 제목", example = "파트 1")
    String secTitle;
    @ApiModelProperty(name = "섹션 설명")
    String secContents;

}
