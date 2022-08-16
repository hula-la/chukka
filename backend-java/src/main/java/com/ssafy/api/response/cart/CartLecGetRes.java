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

    @ApiModelProperty(name = "장바구니 목록 아이디", example = "1,2")
    int cartItemId;
    @ApiModelProperty(name = "강의", example = "1,2")
    int lecId;
    @ApiModelProperty(name = "강사 이름", example = "instructor")
    String insName;
    @ApiModelProperty(name = "썸네일", example = "ssafy/img/thumbnail.jpg")
    String thumbnail;
    @ApiModelProperty(name = "강의 제목", example = "aenergy (Coachella Ver.)")
    String lecTitle;
    @ApiModelProperty(name = "수강료", example = "150,000")
    int lecPrice;
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
    @ApiModelProperty(name = "강의 시간", example = "1,2")
    String lecDayAndTime;
    @ApiModelProperty(name = "강의 일정", example = "1,2")
    String lecSchedule;


    public CartLecGetRes(Lecture lecture, int cartItemId){
        this.cartItemId = cartItemId;
        this.lecId  = lecture.getLecId();
        this.insName = lecture.getInstructor().getInsName();
        this.lecTitle = lecture.getLecTitle();
        this.lecPrice = lecture.getLecPrice();
        this.lecStartDate = lecture.getLecStartDate();
        this.lecEndDate = lecture.getLecEndDate();
        this.lecCategory = lecture.getLecCategory();
        this.lecLevel = lecture.getLecLevel();
        this.lecLimit = lecture.getLecLimit();
        this.lecGenre = lecture.getLecGenre();
        this.student = lecture.getLecStudent();
        this.thumbnail = lecture.getLecThumb();
        this.lecDayAndTime = lecture.getDayAndTime();
        this.lecSchedule = lecture.getLecSchedule();
    }
}
