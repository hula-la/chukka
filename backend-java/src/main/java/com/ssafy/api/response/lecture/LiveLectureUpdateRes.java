package com.ssafy.api.response.lecture;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@ApiModel("LiveLectureUpdateResponse")
public class LiveLectureUpdateRes extends BaseResponseBody {

    @ApiModelProperty(name = "강의 ID", example = "1, 2")
    int lecId;
    @ApiModelProperty(name = "강사 아이디", example = "instructor")
    int insId;
    @ApiModelProperty(name = "썸네일", example = "img/thumbnail.jpg")
    String lecThumb;
    @ApiModelProperty(name = "강의 제목", example = "aenergy (Coachella Ver.)")
    String lecTitle;
    @ApiModelProperty(name = "강의내용", example = "누구의 춤 솰라솰라")
    String lecContents;
    @ApiModelProperty(name = "수강료", example = "150,000")
    int lecPrice;
    @ApiModelProperty(name = "난이도", example = "1,2")
    int lecLevel;
    @ApiModelProperty(name = "춤 장르", example = "1,2")
    String lecGenre;
    @ApiModelProperty(name = "공지사항", example = "이번주는 강의 한번 더 제공~")
    String lecNotice;
    @ApiModelProperty(name = "강의 일정", example = "7주, 주 1회")
    String lecSchedule;
    @ApiModelProperty(name = "강의 요일/시간", example = "화요일, 오후 8시")
    String dayAndTime;
    @ApiModelProperty(name = "강의 시작일", example = "2022/08/10")
    Date lecStartDate;
    @ApiModelProperty(name = "강의 종료일", example = "2022/08/31")
    Date lecEndDate;
    @ApiModelProperty(name = "현재인원", example = "1,2")
    int lecStudent;
    @ApiModelProperty(name = "제한인원", example = "1,2")
    int lecLimit;

    public static LiveLectureUpdateRes of(int lecId,
                                          int insId,
                                          String lecThumb,
                                          String lecTitle,
                                          String lecContents,
                                          int lecPrice,
                                          int lecLevel,
                                          String lecGenre,
                                          String lecNotice,
                                          String lecSchedule,
                                          String dayAndTime,
                                          Date lecStartDate,
                                          Date lecEndDate,
                                          int lecStudent,
                                          int lecLimit) {
        LiveLectureUpdateRes res = new LiveLectureUpdateRes();
        res.setLecId(lecId);
        res.setInsId(insId);
        res.setLecThumb(lecThumb);
        res.setLecTitle(lecTitle);
        res.setLecContents(lecContents);
        res.setLecPrice(lecPrice);
        res.setLecLevel(lecLevel);
        res.setLecGenre(lecGenre);
        res.setLecNotice(lecNotice);
        res.setLecSchedule(lecSchedule);
        res.setDayAndTime(dayAndTime);
        res.setLecStartDate(lecStartDate);
        res.setLecEndDate(lecEndDate);
        res.setLecStudent(lecStudent);
        res.setLecLimit(lecLimit);
        return res;
    }
}
