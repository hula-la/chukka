package com.ssafy.api.request.section;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@ApiModel("SectionGetRequest")
public class SectionGetReq {

    @ApiModelProperty(value = "섹션 ID", example = "1, 2")
    private int secId;
    @ApiModelProperty(value = "섹션 제목", example = "sec_title")
    private String secTitle;
    @ApiModelProperty(value = "섹션 내용", example = "sec_contents")
    private String secContents;
    @ApiModelProperty(value = "섹션 등록일", example = "sec_reg_date")
    private Date secRegDate;
}
