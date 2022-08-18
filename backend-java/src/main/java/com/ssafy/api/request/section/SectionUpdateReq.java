package com.ssafy.api.request.section;

import com.ssafy.db.entity.Instructor;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ApiModel("SectionUpdateRequest")
public class SectionUpdateReq {

    @ApiModelProperty(name = "섹션 ID",example = "1")
    int secId;
    @ApiModelProperty(name = "강사 Id",example = "your_id")
    String insId;
    @ApiModelProperty(name = "섹션 제목",example = "section_title")
    String secTitle;
    @ApiModelProperty(name = "섹션 설명")
    String secContents;
}
