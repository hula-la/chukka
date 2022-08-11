package com.ssafy.api.response.lecture;

import com.ssafy.api.response.instructor.InstructorGetRes;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LectureGetForDetailResponse")
public class LectureDetailRes {

    @ApiModelProperty(value = "강의 ID")
    private int lecId;
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

    public static LectureDetailRes of(Lecture lecture){
        LectureDetailRes res = new LectureDetailRes();
        res.setLecId(lecture.getLecId());
        res.setLecTitle(lecture.getLecTitle());
        res.setLecLevel(lecture.getLecLevel());
        res.setLecGenre(lecture.getLecGenre());
        res.setLecCategory(lecture.getLecCategory());
        res.setInsInfo(InstructorGetRes.of(lecture.getInstructor()));
        res.setLecPrice(lecture.getLecPrice());
        res.setLecContents(lecture.getLecContents());
        return res;
    }
}
