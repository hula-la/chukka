package com.ssafy.api.response.admin;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("LectureListResponse")
public class LectureListRes{
	@ApiModelProperty(name="강의 목록")
	Page<Lecture> lectureList;
	@ApiModelProperty(name="강의 리스트")
	List<LectureRes> list;

	public static LectureListRes of(Page<Lecture> lectureList) {
		LectureListRes res = new LectureListRes();
		res.setLectureList(lectureList);
		return res;
	}

	public static LectureListRes off(List<LectureRes> list) {
		LectureListRes res = new LectureListRes();
		res.setList(list);
		return res;
	}
}
