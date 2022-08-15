package com.ssafy.api.response.lecture;

import com.ssafy.api.response.instructor.InstructorGetRes;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Getter
@Setter
@ApiModel("LectureGetForDetailResponse")
public class LectureDetailRes {

    @ApiModelProperty(value = "강의 ID")
    private int lecId;
    @ApiModelProperty(value = "강의 썸네일")
    private String lecThumb;
    @ApiModelProperty(value = "강의 제목")
    private String lecTitle;
    @ApiModelProperty(value = "강의 난이도")
    private int lecLevel;
    @ApiModelProperty(value = "강의 장르")
    private String lecGenre;
    @ApiModelProperty(value = "강의 카테고리")
    private int lecCategory;
    @ApiModelProperty(value = "강사 정보")
    private InstructorGetRes insInfo;
    @ApiModelProperty(value = "가격")
    private int lecPrice;
    @ApiModelProperty(value = "강의 정보")
    private String lecContents;

    @ApiModelProperty(value = "공지사항")
    private String lecNotice;
    @ApiModelProperty(value = "일정")
    private String lecSchedule;
    @ApiModelProperty(value = "일시")
    private String dayAndTime;
    @ApiModelProperty(value = "시작일")
    private Date lecStartDate;
    @ApiModelProperty(value = "종료일")
    private Date lecEndDate;
    @ApiModelProperty(value = "현인원")
    private int lecStudent;
    @ApiModelProperty(value = "총인원")
    private int lecLimit;
    @ApiModelProperty(value = "장바구니 담기 유무")
    private boolean isCart;
    public static LectureDetailRes of(Lecture lecture, boolean isCart){
        LectureDetailRes res = new LectureDetailRes();
        res.setLecId(lecture.getLecId());
        res.setLecThumb(lecture.getLecThumb());
        res.setLecTitle(lecture.getLecTitle());
        res.setLecLevel(lecture.getLecLevel());
        res.setLecGenre(lecture.getLecGenre());
        res.setLecCategory(lecture.getLecCategory());
        res.setInsInfo(InstructorGetRes.of(lecture.getInstructor()));
        res.setLecPrice(lecture.getLecPrice());
        res.setLecContents(lecture.getLecContents());
        res.setLecNotice(lecture.getLecNotice());
        res.setLecSchedule(lecture.getLecSchedule());
        res.setDayAndTime(lecture.getDayAndTime());
        res.setLecStartDate(lecture.getLecStartDate());
        res.setLecEndDate(lecture.getLecEndDate());
        res.setLecStudent(lecture.getLecStudent());
        res.setLecLimit(lecture.getLecLimit());
        res.isCart = isCart;
        return res;
    }
}
