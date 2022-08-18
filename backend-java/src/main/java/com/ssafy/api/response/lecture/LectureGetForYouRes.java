package com.ssafy.api.response.lecture;

import com.ssafy.db.entity.Enroll;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("LectureGetForYouResponse")

public class LectureGetForYouRes {

    @ApiModelProperty(value = "강의 정보")
    private List<LectureGetForListRes> lecList;
    @ApiModelProperty(value = "유저 성별", example = "")
    private int userGender;
    @ApiModelProperty(value = "연령대", example = "")
    private int ageGroup;

    public static LectureGetForYouRes of(List<LectureGetForListRes> lecList,
                                         int userGender,
                                         int ageGroup) {
        LectureGetForYouRes res = new LectureGetForYouRes();
        res.setLecList(lecList);
        res.setUserGender(userGender);
        res.setAgeGroup(ageGroup);
        return res;
    }
}
