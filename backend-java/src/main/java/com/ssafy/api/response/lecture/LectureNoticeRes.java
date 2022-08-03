package com.ssafy.api.response.lecture;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LectureUpdateNoticeResponse")
public class LectureNoticeRes {
    @ApiModelProperty(name = "강의 ID", example = "lecture_id")
    int lecId;
    @ApiModelProperty(name = "수정할 공지사항", example = "modify by this description")
    String lecNotice;

    public static LectureNoticeRes of(int lecId, String lecNotice) {
        LectureNoticeRes res = new LectureNoticeRes();
        res.setLecId(lecId);
        res.setLecNotice(lecNotice);
        return res;
    }
}
