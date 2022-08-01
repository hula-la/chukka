package com.ssafy.api.response.admin;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("LectureListResponse")
public class LectureListRes extends BaseResponseBody{
	@ApiModelProperty(name="강의 목록")
	List<Lecture> lectureList;

	public static LectureListRes of(List<Lecture> lectureList) {
		LectureListRes res = new LectureListRes();
		res.setLectureList(lectureList);
		return res;
	}
}
