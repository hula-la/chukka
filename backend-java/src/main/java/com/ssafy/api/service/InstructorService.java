package com.ssafy.api.service;

import com.ssafy.api.request.instructor.InstructorPostReq;
import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.api.request.user.UserRegisterPostReq;
import com.ssafy.api.response.admin.InstructorRes;
import com.ssafy.api.response.user.UserMyLectureRes;
import com.ssafy.common.util.MailUtil;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Pay;
import com.ssafy.db.entity.Snacks;
import com.ssafy.db.entity.User;
import org.springframework.data.domain.Pageable;

import java.util.List;


/**
 *	강사 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface InstructorService {
	Instructor createInstructor(String insId);
	Instructor updateInstructor(InstructorPostReq insInfo);
	List<InstructorRes> findAll();
	boolean deleteInstructor(String insId);
}
