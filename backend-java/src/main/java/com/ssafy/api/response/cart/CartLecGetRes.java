package com.ssafy.api.response.cart;


import com.ssafy.db.entity.Lecture;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
public class CartLecGetRes {

    @ApiModelProperty(name = "강사 아이디", example = "instructor")
    String insId;
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
    @ApiModelProperty(name = "학생 수", example = "1,2")
    Integer student;

    public CartLecGetRes(Lecture lecture){
        this.insId = lecture.getInstructor().getInsId();
        this.lecTitle = lecture.getLecTitle();
        this.lecContents = lecture.getLecContents();
        this.lecPrice = lecture.getLecPrice();
        this.lecNotice = lecture.getLecNotice();
        this.lecStartDate = lecture.getLecStartDate();
        this.lecEndDate = lecture.getLecEndDate();
        this.lecCategory = lecture.getLecCategory();
        this.lecLevel = lecture.getLecLevel();
        this.lecLimit = lecture.getLecLimit();
        this.lecGenre = lecture.getLecGenre();
        this.student = lecture.getLecStudent();

    }

}
