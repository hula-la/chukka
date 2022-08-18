package com.ssafy.api.service;

import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.api.response.admin.UserRes;

import com.ssafy.api.response.lecture.LectureGetForListRes;
import com.ssafy.api.response.snacks.SnacksRes;
import com.ssafy.api.response.user.UserMyInsLectureRes;
import com.ssafy.api.response.user.UserMyPayRes;
import com.ssafy.api.response.user.UserPayListRes;


import org.springframework.beans.factory.annotation.Autowired;

import com.ssafy.api.response.user.UserMyLectureRes;
import com.ssafy.common.util.MailUtil;
import com.ssafy.db.entity.Pay;
import com.ssafy.db.entity.Snacks;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.user.UserRegisterPostReq;
import com.ssafy.db.entity.User;

import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
	SnacksLikeRepository snacksLikeRepository;
	@Autowired
	PayRepository payRepository;
	@Autowired
	PayListRepository payListRepository;
	@Autowired
	private JavaMailSender emailSender;

	@Value("${spring.mail.username}")
	private String email;
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	@Value("${cloud.aws.region.static}")
	private String region;


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
	public User updateUser(String userId, UserModifyReq modifyInfo, boolean isFile, boolean isProfile) {
		if (userRepository.findByUserId(userId).isPresent()) {
			User now = userRepository.findByUserId(userId).get();
			if(isFile || isProfile) {
				User user = User.builder().userId(userId)
						.userName(modifyInfo.getUserName())
						.userPhone(modifyInfo.getUserPhone())
						.userEmail(modifyInfo.getUserEmail())
						.userNickname(now.getUserNickname())
						.userLvLec(now.getUserLvLec())
						.userLvSnacks(now.getUserLvSnacks())
						.userLvGame(now.getUserLvGame())
						.userGender(now.getUserGender())
						.userRefreshToken(now.getUserRefreshToken())
						.userBirth(modifyInfo.getUserBirth())
						.userPoint(now.getUserPoint())
						.userType(now.getUserType())
						.userPw(now.getUserPw())
						.userProfile("https://" + bucket + ".s3." + region + ".amazonaws.com/img/profile/" + userId)
						.build();
				return userRepository.save(user);
			}
			User user = User.builder().userId(userId)
					.userName(modifyInfo.getUserName())
					.userPhone(modifyInfo.getUserPhone())
					.userEmail(modifyInfo.getUserEmail())
					.userNickname(now.getUserNickname())
					.userLvLec(now.getUserLvLec())
					.userLvSnacks(now.getUserLvSnacks())
					.userLvGame(now.getUserLvGame())
					.userGender(now.getUserGender())
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
		message.setFrom("chukkadance@naver.com");
		message.setTo(mail.getAddress());
		message.setSubject(mail.getTitle());
		message.setText(mail.getContent());
		emailSender.send(message);
	}


	// 유저 아이디로 수강 강의 목록 조회
	@Override
	public List<UserMyLectureRes> getLecturesByUserId(String userId) {
		List<UserMyLectureRes> list = lectureRepository.findLecturesByUserId(userId)
				.stream().map(s -> UserMyLectureRes.of(s)).collect(Collectors.toList());
		return list;
	}

	// 유저 아이디로 스낵스 목록 조회
	@Override
	public List<SnacksRes> getSnacksByUserId(String userId) {
		List<SnacksRes> snack = snacksRepository.findSnacksByUserUserIdOrderBySnacksIdDesc(userId)
				.stream().map(s -> SnacksRes.of(s, snacksLikeRepository.findByUser_UserIdAndSnacks_SnacksId(userId, s.getSnacksId()).isPresent())).collect(Collectors.toList());
		return snack;
	}

	// 유저 아이디로 결제 목록 조회
	@Override
	public List<UserMyPayRes> getPaysByUserId(String userId) {
		List<UserMyPayRes> pay = payRepository.findPaylistUsingFetchJoin(userId)
				.stream().map(s -> new UserMyPayRes(s.getPayId(), s.getUser().getUserId(), s.getPayDate(), s.getPayAmount(), s.getPayMethod(), s.getPayLists()
						.stream().map(ss-> UserPayListRes.of(ss)).collect(Collectors.toList()))).collect(Collectors.toList());
		return pay;

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
		List<UserRes> users = userRepository.findAll().stream().map(s -> UserRes.of(s)).collect(Collectors.toList());
		return users;
	}

	// 검색된 회원 목록 조회
	@Override
	public List<UserRes> getCertainUsers(String category, String keyword) {
		List<UserRes> users = null;
		switch(category) {
			case "userId":
				users = userRepository.findByUserIdContaining(keyword)
						.stream().map(s -> UserRes.of(s)).collect(Collectors.toList());
			case "userName":
				users = userRepository.findByUserNameContaining(keyword)
						.stream().map(s -> UserRes.of(s)).collect(Collectors.toList());
			case "userNickname":
				users = userRepository.findByUserNicknameContaining(keyword)
						.stream().map(s -> UserRes.of(s)).collect(Collectors.toList());
			case "userEmail":
				users = userRepository.findByUserEmailContaining(keyword)
						.stream().map(s -> UserRes.of(s)).collect(Collectors.toList());
			case "userPhone":
				users = userRepository.findByUserPhoneContaining(keyword)
						.stream().map(s -> UserRes.of(s)).collect(Collectors.toList());
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

	@Override
	public List<UserMyInsLectureRes> getLecturesByInstructorId(String userId) {
		List<UserMyInsLectureRes> list = lectureRepository.findAllByInstructor_InsId(userId)
				.stream().map(s -> UserMyInsLectureRes.of(s)).collect(Collectors.toList());
		return list;
	}

}
