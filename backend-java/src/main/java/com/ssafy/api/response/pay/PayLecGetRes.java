package com.ssafy.api.response.pay;

import com.ssafy.api.response.cart.CartLecGetRes;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.PayList;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.Date;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PayLecGetRes {

    @ApiModelProperty(name = "pay lec id", example = "2")
    int payListId;
    @ApiModelProperty(name = "주문번호", example = "220809")
    String merchantUid;

    @ApiModelProperty(name = "강의", example = "1,2")
    int lecId;
    @ApiModelProperty(name = "강사 아이디", example = "instructor")
    String insId;
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
    @ApiModelProperty(name = "춤 장르", example = "1,2")
    String lecGenre;
    @ApiModelProperty(name = "강의 시간", example = "1,2")
    String lecDayAndTime;
    @ApiModelProperty(name = "강의 일정", example = "1,2")
    String lecSchedule;


    public static PayLecGetRes of(PayList payList){
        Lecture lec = payList.getLecture();
        PayLecGetRes res = new PayLecGetRes();
        res.setPayListId(payList.getPaylistId());
        res.setMerchantUid(payList.getMerchant_uid());
        res.setLecId(lec.getLecId());
        res.setLecCategory(lec.getLecCategory());
        res.setLecLevel(lec.getLecLevel());
        res.setLecGenre(lec.getLecGenre());
        res.setLecDayAndTime(lec.getDayAndTime());
        res.setLecSchedule(lec.getLecSchedule());
        res.setLecTitle(lec.getLecTitle());
        res.setInsId(lec.getInstructor().getInsId());
        res.setLecStartDate(lec.getLecStartDate());
        res.setLecEndDate(lec.getLecEndDate());
        res.setThumbnail(lec.getLecThumb());
        return res;
    }

}
