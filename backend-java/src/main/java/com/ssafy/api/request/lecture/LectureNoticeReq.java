package com.ssafy.api.request.lecture;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LectureUpdateNoticeRequest")
public class LectureNoticeReq {

    @ApiModelProperty(name = "수정할 공지사항", example = "modify by this description")
    String lecNotice;
}
