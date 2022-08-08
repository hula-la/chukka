package com.ssafy.api.response.lecture;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LectureGetForDetailResponse")
public class LectureGetForDetailRes extends BaseResponseBody {

    @ApiModelProperty(value = "강의 ID")
    private int lecId;
    @ApiModelProperty(value = "강의 제목")
    private String lecTitle;
    @ApiModelProperty(value = "강의 난이도")
    private int lecLevel;
    @ApiModelProperty(value = "강의 장르")
    private String levGenre;
    @ApiModelProperty(value = "강의 카테고리")
    private int lecCategory;
    @ApiModelProperty(value = "강사 이름")
    private String insName;
    @ApiModelProperty(value = "현 인원")
    private int lecStudent;
    @ApiModelProperty(value = "정원")
    private int lecLimit;
//    @ApiModelProperty(value = "강의 기간")
//    private int lecId;
//    @ApiModelProperty(value = "강의 시간")
//    private int lecId;
    @ApiModelProperty(value = "가격")
    private int lecPrice;
    @ApiModelProperty(value = "강의 정보")
    private int lecContents;

    public static LectureGetForDetailRes of(int lecId,
                                            String lecTitle,
                                            int lecLevel,
                                            String levGenre,
                                            int lecCategory,
                                            String insName,
                                            int lecStudent,
                                            int lecLimit,
                                            // int lecId,
                                            // int lecId,
                                            int lecPrice,
                                            int lecContents){
        LectureGetForDetailRes res = new LectureGetForDetailRes();
        res.setLecId(lecId);
        res.setLecTitle(lecTitle);
        res.setLecLevel(lecLevel);
        res.setLevGenre(levGenre);
        res.setLecCategory(lecCategory);
        res.setInsName(insName);
        res.setLecStudent(lecStudent);
        res.setLecLimit(lecLimit);
        res.setLecPrice(lecPrice);
        res.setLecContents(lecContents);
        return res;
    }
}
