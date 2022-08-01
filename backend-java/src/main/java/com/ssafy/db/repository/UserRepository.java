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

    Optional<User> findByUserNickname(String userNickname);

    @Transactional
//    @Modifying(clearAutomatically = true)
    @Modifying
    @Query(value = "update User u set u.user_access_token = :userAccessToken where u.user_id = :userId", nativeQuery = true)
    Optional<Integer> updateUserAccessToken(String userId, String userAccessToken);
    @Transactional
    @Modifying
    @Query(value = "update User u set u.user_refresh_token = :userRefreshToken where u.user_id = :userId", nativeQuery = true)
    Optional<Integer> updateUserRefreshToken(String userId, String userRefreshToken);

    @Transactional
    @Modifying
    @Query(value = "update User u set u.user_phone = :userPhone, u.user_email = :userEmail, u.user_gender = :userGender, u.user_birth = :userBirth, u.user_nickname = :userNickname where u.user_id = :userId", nativeQuery = true)
    Optional<Integer> updateUser(String userId, String userPhone, String userEmail, int userGender, Date userBirth, String userNickname);

    @Transactional
    @Modifying
    @Query(value = "update User u set u.user_pw = :userPw where u.user_id = :userId", nativeQuery = true)
    void updatePassword(String userId, String userPw);

    Optional<User> findUserByUserRefreshToken(String userRefreshToken);

    @Transactional
    @Modifying
    @Query(value = "update User u set u.user_refresh_token = '' where u.user_id = :userId", nativeQuery = true)
    void updateRefreshToken(String userId);

    @Query(value = "select u.user_id, u.user_name, u.user_phone, u.user_email, u.user_nickname, u.user_gender, u.user_birth, u.user_type from User u", nativeQuery = true)
    List<User> getUsers(Pageable pageable);

    @Query(value = "select u.user_id, u.user_name, u.user_phone, u.user_email, u.user_nickname, u.user_gender, u.user_birth, u.user_type from User u where u.user_id like :userId", nativeQuery = true)
    List<User> getUsersByUserId(String userId);

    @Query(value = "select  u.user_id, u.user_name, u.user_phone, u.user_email, u.user_nickname, u.user_gender, u.user_birth, u.user_type from User u where u.user_name like :userName", nativeQuery = true)
    List<User> getUsersByUserName(String userName);

    @Query(value = "select  u.user_id, u.user_name, u.user_phone, u.user_email, u.user_nickname, u.user_gender, u.user_birth, u.user_type from User u where u.user_nickname like :userNickname", nativeQuery = true)
    List<User> getUsersByUserNickname(String userNickname);

    @Query(value = "select u.user_id, u.user_name, u.user_phone, u.user_email, u.user_nickname, u.user_gender, u.user_birth, u.user_type from User u where u.user_email like :userEmail", nativeQuery = true)
    List<User> getUsersByUserEmail(String userEmail);

    @Query(value = "select  u.user_id, u.user_name, u.user_phone, u.user_email, u.user_nickname, u.user_gender, u.user_birth, u.user_type from User u where u.user_phone like :userPhone", nativeQuery = true)
    List<User> getUsersByUserPhone(String userPhone);

    @Query(value = "update User u set u.user_type = 1 where u.user_id = :userId", nativeQuery = true)
    void updateUserType(String userId);

}