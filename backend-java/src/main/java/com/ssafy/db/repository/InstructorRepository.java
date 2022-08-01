package com.ssafy.db.repository;

import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * 강사 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface InstructorRepository extends JpaRepository<Instructor, String> {

    @Query(value = "update Instructor i set i.ins_name = :insName, i.ins_email = :insEmail, i.ins_introduce = :insIntroduce, i.ins_profile = :insProfile where i.ins_id = :insId", nativeQuery = true)
    void updateInstructor(String insId, String insName, String insEmail, String insIntroduce, String insProfile);

}