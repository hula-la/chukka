package com.ssafy.api.service;

import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.api.response.admin.UserRes;
import org.springframework.beans.factory.annotation.Autowired;

import com.ssafy.api.response.user.UserMyLectureRes;
import com.ssafy.common.util.MailUtil;
import com.ssafy.db.entity.Pay;
import com.ssafy.db.entity.Snacks;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.user.UserRegisterPostReq;
import com.ssafy.db.entity.User;

import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;

import java.util.ArrayList;
import java.util.List;
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
	LectureRepository lectureRepository;
	@Autowired
	SnacksRepository snacksRepository;
	@Autowired
	PayRepository payRepository;
	private JavaMailSender emailSender;
	@Value("${spring.mail.username}")
	private String email;


	// 회원 생성
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = User.builder().userId(userRegisterInfo.getUserId())
				.userPw(passwordEncoder.encode(userRegisterInfo.getUserPw()))
				.userName(userRegisterInfo.getUserName())
				.userPhone(userRegisterInfo.getUserPhone())
				.userEmail(userRegisterInfo.getUserEmail())
				.userGender(userRegisterInfo.getUserGender())
				.userBirth(userRegisterInfo.getUserBirth())
				.userNickname(userRegisterInfo.getUserNickname())
				.build();
		return userRepository.save(user);
	}

	// 아이디를 통한 유저 조회
	@Override
	public User getUserByUserId(String userId) {
		Optional<User> user = userRepository.findByUserId(userId);
		if(user.isPresent()) {
			return user.get();
		}
		return null;
	}

	// 닉네임을 통한 유저 조회
	@Override
	public User getUserByUserNickname(String userNickname) {
		Optional<User> user = userRepository.findByUserNickname(userNickname);
		if(user.isPresent()) {
			return user.get();
		}
		return null;
	}

	// (로그인 시) 유저 리프레시 토큰 저장
	@Override
	public int updateUserRefreshToken(String userId, String userRefreshToken) {
		if(userRepository.findByUserId(userId).isPresent()) {
			return userRepository.updateUserRefreshToken(userId, userRefreshToken);
		}
		return 0;
	}

	// 유저 정보 수정
	@Override
	public User updateUser(String userId, UserModifyReq modifyInfo) {
		if (userRepository.findByUserId(userId).isPresent()) {
			User now = userRepository.findByUserId(userId).get();
			User user = User.builder().userId(userId)
					.userName(modifyInfo.getUserName())
					.userPhone(modifyInfo.getUserPhone())
					.userEmail(modifyInfo.getUserEmail())
					.userNickname(modifyInfo.getUserNickname())
					.userLvLec(now.getUserLvLec())
					.userLvSnacks(now.getUserLvSnacks())
					.userLvGame(now.getUserLvGame())
					.userGender(modifyInfo.getUserGender())
					.userRefreshToken(now.getUserRefreshToken())
					.userBirth(modifyInfo.getUserBirth())
					.userPoint(now.getUserPoint())
					.userType(now.getUserType())
					.userPw(now.getUserPw())
					.build();
			return userRepository.save(user);
		}
		return null;
	}

	// 비밀번호 수정
	@Override
	public int updatePw(String userId, String userPw) {
		String password = passwordEncoder.encode(userPw);
		if(userRepository.findByUserId(userId).isPresent()) {
			return userRepository.updatePassword(userId, password);
		}
		return 0;
	}

	// 임의 생성 랜덤 비밀번호 메일 전송
	@Override
	public void sendPw(MailUtil mail) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(email);
		message.setTo(mail.getAddress());
		message.setSubject(mail.getTitle());
		message.setText(mail.getContent());
		emailSender.send(message);
	}

	// 유저 아이디로 수강 강의 목록 조회
	@Override
	public List<UserMyLectureRes> getLecturesByUserId(String userId) {
		return lectureRepository.findLecturesByUserId(userId);
	}

	// 유저 아이디로 스낵스 목록 조회
	@Override
	public List<Snacks> getSnacksByUserId(String userId) {
		return snacksRepository.findSnacksByUserUserIdOrderBySnacksIdDesc(userId);
	}

	// 유저 아이디로 결제 목록 조회
	@Override
	public List<Pay> getPaysByUserId(String userId) {
		return payRepository.findPaylistUsingFetchJoin(userId);
	}

	// 리프레시 토큰으로 유저 조회
	@Override
	public User getUserByRefreshToken(String refreshToken) {
		Optional<User> user = userRepository.findUserByUserRefreshToken(refreshToken);
		if(user.isPresent()) {
			return user.get();
		}
		return null;
	}

	// 로그아웃
	@Override
	public int logout(String userId) {
		if(userRepository.findByUserId(userId).isPresent()) {
			return userRepository.updateRefreshToken(userId);
		}
		return 0;
	}

	// 모든 회원 목록 조회
	@Override
	public List<UserRes> getUsers() {
		List<User> list = userRepository.findAll();
		List<UserRes> users = new ArrayList<>();
		for (int i = 0; i < list.size(); i++) {
			users.add(UserRes.of(list.get(i)));
		}
		return users;
	}

	// 검색된 회원 목록 조회
	@Override
	public List<UserRes> getCertainUsers(String category, String keyword) {
		List<User> list;
		List<UserRes> users = new ArrayList<>();
		switch(category) {
			case "userId":
				list = userRepository.findByUserIdContaining(keyword);
				for (int i = 0; i < list.size(); i++) {
					users.add(UserRes.of(list.get(i)));
				}
			case "userName":
				list = userRepository.findByUserNameContaining(keyword);
				for (int i = 0; i < list.size(); i++) {
					users.add(UserRes.of(list.get(i)));
				}
			case "userNickname":
				list = userRepository.findByUserNicknameContaining(keyword);
				for (int i = 0; i < list.size(); i++) {
					users.add(UserRes.of(list.get(i)));
				}
			case "userEmail":
				list = userRepository.findByUserEmailContaining(keyword);
				for (int i = 0; i < list.size(); i++) {
					users.add(UserRes.of(list.get(i)));
				}
			case "userPhone":
				list = userRepository.findByUserPhoneContaining(keyword);
				for (int i = 0; i < list.size(); i++) {
					users.add(UserRes.of(list.get(i)));
				}
		}
		return users;
	}

	// 회원 삭제
	@Override
	public boolean quit(String userId) {
		if(userRepository.findByUserId(userId).isPresent()) {
			userRepository.delete(User.builder().userId(userId).build());
			return true;
		}
		return false;
	}

	// 강사 권한 변경
	@Override
	public void createInstructor(String userId, int userType) {
		userRepository.updateUserType(userId, userType);
	}

}
