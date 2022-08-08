package com.ssafy.api.response.lecture;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LecturePopularRes")
public class LectureGetForListRes {

    @ApiModelProperty(value = "인기순 강의 제목", example = "")
    private String lecTitle;
    @ApiModelProperty(value = "인기순 강의 내용", example = "")
    private String lecContents;
    @ApiModelProperty(value = "인기순 강의 카테고리", example = "")
    private int lecCategory;
    @ApiModelProperty(value = "인기순 난이도", example = "")
    private int lecLevel;
    @ApiModelProperty(value = "인기순 장르", example = "")
    private String lecGenre;

    public static LectureGetForListRes of(String lecTitle,
                                          String lecContents,
                                          int lecCategory,
                                          int lecLevel,
                                          String lecGenre) {
        LectureGetForListRes res = new LectureGetForListRes();
        res.setLecTitle(lecTitle);
        res.setLecContents(lecContents);
        res.setLecCategory(lecCategory);
        res.setLecLevel(lecLevel);
        res.setLecGenre(lecGenre);
        return res;
    }
}
