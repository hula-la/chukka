package com.ssafy.api.service;

import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.api.request.user.UserRegisterPostReq;

import com.ssafy.db.entity.User;

import com.ssafy.api.response.user.UserMyLectureRes;
import com.ssafy.common.util.MailUtil;
import com.ssafy.db.entity.Pay;
import com.ssafy.db.entity.Snacks;
import org.springframework.data.domain.Pageable;

import java.util.List;


/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
	User getUserByUserNickname(String userNickname);
	void updateUserToken(String userId, String userAccessToken);
	User updateUser(String userId, UserModifyReq modifyInfo);
	Integer updatePw(String userId, String userPw);
	void sendPw(MailUtil mail);
	List<UserMyLectureRes> getLecturesByUserId(String userId, Pageable pageable);
	List<Snacks> getSnacksByUserId(String UserId, Pageable pageable);
	List<Pay> getPaysByUserId(String userId, Pageable pageable);
	User getUserByRefreshToken(String refreshToken);
	void logout(String userId);
	List<User> getUsers(Pageable pageable);
	List<User> getCertainUsers(String category, String keyword);
	void quit(String userId);
	void createInstructor(String userId);

}
