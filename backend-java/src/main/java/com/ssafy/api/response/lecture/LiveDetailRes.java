package com.ssafy.api.response.lecture;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@ApiModel("LiveDetailResponse")
public class LiveDetailRes extends BaseResponseBody {

    @ApiModelProperty(value = "강의 ID")
    int lecId;
    @ApiModelProperty(value = "강사 ID")
    int insId;
    @ApiModelProperty(value = "썸네일")
    String lecThumb;
    @ApiModelProperty(value = "강의 제목")
    String lecTitle;
    @ApiModelProperty(value = "강의 내용")
    String lecContents;
    @ApiModelProperty(value = "공지사항")
    String lecNotice;
    @ApiModelProperty(value = "강의 일정")
    String lecSchedule;
    @ApiModelProperty(value = "강의 요일/시간")
    String dayAndTime;
    @ApiModelProperty(value = "강의 시작일")
    Date lecStartDate;
    @ApiModelProperty(value = "현재 인원")
    int lecStudent;
    @ApiModelProperty(value = "제한 인원")
    int lecLimit;
    @ApiModelProperty(value = "춤 장르")
    String lecGenre;
    @ApiModelProperty(value = "강의 난이도")
    int lecLevel;

    public static LiveDetailRes of(int lecId,
                                   int insId,
                                   String lecThumb,
                                   String lecTitle,
                                   String lecContents,
                                   String lecNotice,
                                   String lecSchedule,
                                   String dayAndTime,
                                   Date lecStartDate,
                                   int lecStudent,
                                   int lecLimit,
                                   String lecGenre,
                                   int lecLevel
                                   ) {
        LiveDetailRes res = new LiveDetailRes();
        res.setLecId(lecId);
        res.setInsId(insId);
        res.setLecThumb(lecThumb);
        res.setLecTitle(lecTitle);
        res.setLecContents(lecContents);
        res.setLecNotice(lecNotice);
        res.setLecSchedule(lecSchedule);
        res.setDayAndTime(dayAndTime);
        res.setLecStartDate(lecStartDate);
        res.setLecStudent(lecStudent);
        res.setLecLimit(lecLimit);
        res.setLecGenre(lecGenre);
        res.setLecLevel(lecLevel);
        return res;
    }
}
