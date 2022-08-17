package com.ssafy.db.repository;

import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.db.entity.Lecture;

import com.ssafy.db.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.beans.Transient;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
    Optional<User> findByUserId(String userId);

    User findUserByUserId(String userId);

    Optional<User> findByUserNickname(String userNickname);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.user_refresh_token = :userRefreshToken where u.user_id = :userId", nativeQuery = true)
    int updateUserRefreshToken(String userId, String userRefreshToken);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.user_pw = :userPw where u.user_id = :userId", nativeQuery = true)
    int updatePassword(String userId, String userPw);

    Optional<User> findUserByUserRefreshToken(String userRefreshToken);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.user_refresh_token = '' where u.user_id = :userId", nativeQuery = true)
    int updateRefreshToken(String userId);

    List<User> findByUserIdContaining(String keyword);
    List<User> findByUserNameContaining(String keyword);
    List<User> findByUserNicknameContaining(String keyword);
    List<User> findByUserEmailContaining(String keyword);
    List<User> findByUserPhoneContaining(String keyword);
    @Transactional
    @Modifying
    @Query(value = "update user u set u.user_type = :userType where u.user_id = :userId", nativeQuery = true)
    int updateUserType(String userId, int userType);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.user_lv_game = u.user_lv_game + :exp where u.user_id = :userId", nativeQuery = true)
    int updateGameExp(String userId, int exp);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.user_lv_snacks = u.user_lv_snacks + :exp where u.user_id = :userId", nativeQuery = true)
    int updateSnacksExp(String userId, int exp);

}