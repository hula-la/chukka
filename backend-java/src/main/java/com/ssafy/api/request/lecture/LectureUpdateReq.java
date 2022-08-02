package com.ssafy.api.request.lecture;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
@ApiModel("LectureUpdateRequest")
public class LectureUpdateReq {

    @ApiModelProperty(name = "강의 ID", example = "lecture_id")
    int lecId;
    @ApiModelProperty(name = "강의 썸네일", example = "img/thumbnail.jpg")
    MultipartFile thumbnail;
    @ApiModelProperty(name = "강의 제목", example = "lec_title")
    String lecTitle;
    @ApiModelProperty(name = "강의 내용", example = "lec_contents")
    String lecContents;
    @ApiModelProperty(name = "가격", example = "150,000")
    int lecPrice;
    @ApiModelProperty(name = "공지사항", example = "lec_notice")
    String lecNotice;
    @ApiModelProperty(name = "강의 시작일", example = "2022/08/10")
    Date lecStartDate;
    @ApiModelProperty(name = "강의 종료일", example = "2022/08/31")
    Date lecEndDate;
    @ApiModelProperty(name = "강의 카테고리", example = "1, 2")
    int lecCategory;
    @ApiModelProperty(name = "강의 난이도", example = "상? 중? 하?")
    int lecLevel;
    @ApiModelProperty(name = "강의 제한인원", example = "20명")
    int lecLimit;
    @ApiModelProperty(name = "춤 장르", example = "힙합, 팝..")
    String lecGenre;
}
