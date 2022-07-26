package com.ssafy.api.service;

import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.api.request.user.UserRegisterPostReq;
import com.ssafy.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
	User getUserByUserNickname(String userNickname);
	Integer updateUserToken(String userId, String userAccessToken);
	Integer updateUser(String userId, UserModifyReq modifyInfo);
}
