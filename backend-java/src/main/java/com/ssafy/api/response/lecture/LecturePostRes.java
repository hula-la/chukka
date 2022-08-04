package com.ssafy.api.response.lecture;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Instructor;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@ApiModel("LecturePostResponse")
public class LecturePostRes {

    @ApiModelProperty(name = "강의 ID", example = "1,2")
    int lecId;
    @ApiModelProperty(name = "강사 정보", example = "instructor")
    Instructor instructor;
    @ApiModelProperty(name = "썸네일", example = "ssafy/img/thumbnail.jpg")
    String thumbnail;
    @ApiModelProperty(name = "강의 제목", example = "aenergy (Coachella Ver.)")
    String lecTitle;
    @ApiModelProperty(name = "강의내용", example = "누구의 춤 솰라솰라")
    String lecContents;
    @ApiModelProperty(name = "수강료", example = "150,000")
    int lecPrice;
    @ApiModelProperty(name = "공지사항", example = "이번주는 강의 한번 더 제공~")
    String lecNotice;
    @ApiModelProperty(name = "강의 시작일", example = "2022/08/10")
    Date lecStartDate;
    @ApiModelProperty(name = "강의 종료일", example = "2022/08/31")
    Date lecEndDate;
    @ApiModelProperty(name = "카테고리", example = "1,2")
    int lecCategory;
    @ApiModelProperty(name = "난이도", example = "1,2")
    int lecLevel;
    @ApiModelProperty(name = "제한인원", example = "1,2")
    int lecLimit;
    @ApiModelProperty(name = "춤 장르", example = "1,2")
    String lecGenre;

    @ApiModelProperty(name = "춤 장르", example = "1,2")
    int lecStudent;


    public static LecturePostRes of(int lecId,
                                    Instructor instructor,
                                    String thumbnail,
                                    String lecTitle,
                                    String lecContents,
                                    int lecPrice,
                                    String lecNotice,
                                    Date lecStartDate,
                                    Date lecEndDate,
                                    int lecCategory,
                                    int lecLevel,
                                    int lecLimit,
                                    String lecGenre,
                                    int lecStudent
                                    ) {
        LecturePostRes res = new LecturePostRes();
        res.setLecId(lecId);
        res.setInstructor(instructor);
        res.setThumbnail(thumbnail);
        res.setLecTitle(lecTitle);
        res.setLecContents(lecContents);
        res.setLecPrice(lecPrice);
        res.setLecNotice(lecNotice);
        res.setLecStartDate(lecStartDate);
        res.setLecEndDate(lecEndDate);
        res.setLecCategory(lecCategory);
        res.setLecLevel(lecLevel);
        res.setLecLimit(lecLimit);
        res.setLecGenre(lecGenre);
        res.setLecStudent(lecStudent);
        return res;
    }
}
