package com.ssafy.api.request.lecture;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NoticeUpdateRequest")
public class NoticeUpdateReq {

    @ApiModelProperty(value = "강의 ID")
    private int lecId;
    @ApiModelProperty(value = "공지사항")
    private String lecNotice;
}
