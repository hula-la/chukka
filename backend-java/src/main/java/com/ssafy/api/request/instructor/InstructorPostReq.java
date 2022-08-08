package com.ssafy.api.request.instructor;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
@ApiModel("InstructorPostRequest")
public class InstructorPostReq {

	@ApiModelProperty(name="강사 Id", example="your_id")
	String insId;
	@ApiModelProperty(name="강사 이름", example="your_name")
	String insName;
	@ApiModelProperty(name="강사 Email", example="abcd@ssafy.com")
	String insEmail;
	@ApiModelProperty(name="강사 소개", example="your_introduce")
	String insIntroduce;

}
