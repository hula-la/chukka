package com.ssafy.api.response.admin;

import com.ssafy.db.entity.Instructor;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("InstructorListResponse")
public class InstructorRes {
	@ApiModelProperty(name="강사 아이디")
	String insId;
	@ApiModelProperty(name="강의 이름")
	String insName;
	@ApiModelProperty(name="강의 이메일")
	String insEmail;
	@ApiModelProperty(name="강의 소개")
	String insIntroduce;
	@ApiModelProperty(name="강의 프로필")
	String insProfile;

	public static InstructorRes of(Instructor instructor) {
		InstructorRes res = new InstructorRes();
		res.setInsId(instructor.getInsId());
		res.setInsName(instructor.getInsName());
		res.setInsEmail(instructor.getInsEmail());
		res.setInsIntroduce(instructor.getInsIntroduce());
		res.setInsProfile(instructor.getInsProfile());
		return res;
	}

}
