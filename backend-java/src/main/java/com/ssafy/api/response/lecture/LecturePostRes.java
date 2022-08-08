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
    @ApiModelProperty(name = "카테고리", example = "1,2")
    int lecCategory;
    @ApiModelProperty(name = "난이도", example = "1,2")
    int lecLevel;
    @ApiModelProperty(name = "춤 장르", example = "1,2")
    String lecGenre;


    public static LecturePostRes of(int insId,
                                    String lecTitle,
                                    String lecContents,
                                    int lecPrice,
                                    int lecCategory,
                                    int lecLevel,
                                    String lecGenre
                                    ) {
        LecturePostRes res = new LecturePostRes();
        res.setInsId(insId);
        res.setLecTitle(lecTitle);
        res.setLecContents(lecContents);
        res.setLecPrice(lecPrice);
        res.setLecCategory(lecCategory);
        res.setLecLevel(lecLevel);
        res.setLecGenre(lecGenre);
        return res;
    }
}
