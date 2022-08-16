package com.ssafy.api.response.lecture;

import com.ssafy.common.model.response.BaseResponseBody;
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
@ApiModel("LecturePopularRes")
public class LectureGetForListRes {

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

    public static LectureGetForListRes of(int lecId,
                                          String lecThumb,
                                          String lecTitle,
                                          int lecCategory,
                                          int lecLevel,
                                          String lecGenre) {
        LectureGetForListRes res = new LectureGetForListRes();
        res.setLecId(lecId);
        res.setLecThumb(lecThumb);
        res.setLecTitle(lecTitle);
        res.setLecCategory(lecCategory);
        res.setLecLevel(lecLevel);
        res.setLecGenre(lecGenre);
        return res;
    }
}
