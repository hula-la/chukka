package com.ssafy.api.response.instructor;

import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.response.lecture.LecturePostRes;
import com.ssafy.db.entity.Instructor;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ApiModel("InstructorPostRequest")
public class InstructorPostRes {

    @ApiModelProperty(name="강사 Id", example="your_id")
    String insId;
    @ApiModelProperty(name="강사 이름", example="your_name")
    String insName;
    @ApiModelProperty(name="강사 Email", example="abcd@ssafy.com")
    String insEmail;
    @ApiModelProperty(name="강사 프로필", example="img/profile.png")
    MultipartFile insProfile;
    @ApiModelProperty(name="강사 소개", example="your_introduce")
    String insIntroduce;
    List<LecturePostReq> lectures;


}
