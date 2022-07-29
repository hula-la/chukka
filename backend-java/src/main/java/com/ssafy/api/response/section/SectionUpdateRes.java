package com.ssafy.api.response.section;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Instructor;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("SectionUpdateResponse")
public class SectionUpdateRes extends BaseResponseBody {

    @ApiModelProperty(name = "섹션 ID",example = "section_id")
    int secId;
    @ApiModelProperty(name = "강사 정보",example = "InstructorInfo")
    Instructor instructor;
    @ApiModelProperty(name = "섹션 제목",example = "section_title")
    String secTitle;
    @ApiModelProperty(name = "섹션 내용",example = "section_contents")
    String secContents;

    public static SectionUpdateRes of(Integer statusCode,
                                      String message,
                                      int secId,
                                      Instructor instructor,
                                      String secTitle,
                                      String secContents) {
        SectionUpdateRes res = new SectionUpdateRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSecId(secId);
        res.setInstructor(instructor);
        res.setSecTitle(secTitle);
        res.setSecContents(secContents);
        return res;
    }
}
