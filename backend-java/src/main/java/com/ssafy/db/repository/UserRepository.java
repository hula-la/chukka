package com.ssafy.db.repository;

import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.beans.Transient;
import java.util.Date;
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
    @Query(value = "update User u set u.userAccessToken = :userAccessToken where u.userId = :userId", nativeQuery = true)
    Optional<Integer> updateUserAccessToken(String userId, String userAccessToken);
    @Transactional
    @Modifying
    @Query(value = "update User u set u.userPhone = :userPhone, u.userEmail = :userEmail, u.userGender = :userGender, u.userBirth = :userBirth, u.userNickname = :userNickname, u.userProfile = :userProfile where u.userId = :userId", nativeQuery = true)
    Optional<Integer> updateUser(String userId, String userPhone, String userEmail, int userGender, Date userBirth, String userNickname, String userProfile);

    @Transactional
    @Modifying
    @Query(value = "update User u set u.userPw = :userPw where u.userId = :userId", nativeQuery = true)
    Optional<Integer> updatePassword(String userId, String userPw);
}