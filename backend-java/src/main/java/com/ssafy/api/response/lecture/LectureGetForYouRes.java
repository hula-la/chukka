package com.ssafy.api.response.lecture;

import com.ssafy.db.entity.Enroll;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("LectureGetForYouResponse")

public class LectureGetForYouRes {

    @ApiModelProperty(value = "강의 ID", example = "")
    private int lecId;
    @ApiModelProperty(value = "강의 썸네일", example = "")
    private String lecThumb;
    @ApiModelProperty(value = "인기순 강의 제목", example = "")
    private String lecTitle;
    @ApiModelProperty(value = "인기순 강의 카테고리", example = "")
    private int lecCategory;
    @ApiModelProperty(value = "인기순 난이도", example = "")
    private int lecLevel;
    @ApiModelProperty(value = "인기순 장르", example = "")
    private String lecGenre;
    @ApiModelProperty(value = "유저 성별", example = "")
    private int userGender;
    @ApiModelProperty(value = "연령대", example = "")
    private int ageGroup;

    public static LectureGetForYouRes of(Enroll enroll) {
        LectureGetForYouRes res = new LectureGetForYouRes();
        res.setLecId(enroll.getLecture().getLecId());
        res.setLecThumb(enroll.getLecture().getLecThumb());
        res.setLecTitle(enroll.getLecture().getLecTitle());
        res.setLecCategory(enroll.getLecture().getLecCategory());
        res.setLecLevel(enroll.getLecture().getLecLevel());
        res.setLecGenre(enroll.getLecture().getLecGenre());
        res.setUserGender(enroll.getUser().getUserGender());
        res.setAgeGroup(enroll.getAgeGroup());
        return res;
    }
}
