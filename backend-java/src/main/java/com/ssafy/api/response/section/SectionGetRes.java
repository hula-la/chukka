package com.ssafy.api.response.section;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Section;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@ApiModel("SectionGetResponse")
public class SectionGetRes {

    @ApiModelProperty(value = "섹션 ID", example = "1, 2")
    private int secId;
    @ApiModelProperty(value = "섹션 제목", example = "sec_title")
    private String secTitle;
    @ApiModelProperty(value = "섹션 내용", example = "http://chukka/section/contents/section_id")
    private String secContents;
    @ApiModelProperty(value = "섹션 썸네일", example = "img.jpg")
    private String secThumb;

    public static SectionGetRes of(int secId,
                                   String secTitle,
                                   String secContents,
                                   String secThumb) {
        SectionGetRes res = new SectionGetRes();
        res.setSecId(secId);
        res.setSecTitle(secTitle);
        res.setSecContents(secContents);
        res.setSecThumb(secThumb);
        return res;
    }
}
