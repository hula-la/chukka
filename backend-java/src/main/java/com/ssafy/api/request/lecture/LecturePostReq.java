package com.ssafy.api.request.lecture;

import com.ssafy.db.entity.Instructor;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
@ApiModel("LecturePostRequest")
public class LecturePostReq {

    @ApiModelProperty(name = "강사 아이디", example = "instructor")
    String insId;
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
}
