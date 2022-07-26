package com.ssafy.api.service;

import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.common.util.MailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.user.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;

import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private JavaMailSender emailSender;
	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setUserId(userRegisterInfo.getUserId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setUserPw(passwordEncoder.encode(userRegisterInfo.getUserPw()));
		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findUserByUserId(userId).get();
		return user;
	}

	@Override
	public User getUserByUserNickname(String userNickname) {
		Optional<User> user = userRepository.findByUserNickname(userNickname);
		if(user == null) {
			return null;
		}
		return user.get();
	}

	@Override
	public Integer updateUserToken(String userId, String userAccessToken) {
		userRepository.updateUserAccessToken(userId, userAccessToken);
		return null;
	}

	@Override
	public User updateUser(String userId, UserModifyReq modifyInfo) {
		userRepository.updateUser(userId, modifyInfo.getUserPhone(), modifyInfo.getUserEmail(), modifyInfo.getUserGender(), modifyInfo.getUserBirth(), modifyInfo.getUserNickname(), modifyInfo.getUserProfile());
		User user = userRepository.findByUserId(userId).get();
		return user;
	}

	@Override
	public Integer updatePw(String userId, String userPw) {
		String password = passwordEncoder.encode(userPw);
		userRepository.updatePassword(userId, password);
		return null;
	}

	@Override
	public void sendPw(MailUtil mail) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("chukkadance@naver.com");
		message.setTo(mail.getAddress());
		message.setSubject(mail.getTitle());
		message.setText(mail.getContent());
		emailSender.send(message);
	}
}
