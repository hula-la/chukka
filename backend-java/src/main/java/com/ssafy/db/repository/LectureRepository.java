package com.ssafy.db.repository;

import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.db.entity.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, String> {
    // 전체 강의 목록 조회
    //    Optional<Lecture> findAll(List<Lecture> list);

    // 공지사항 수정
    @Modifying(clearAutomatically = true)
    @Query("update Lecture lec set lec.lecNotice = :lecNotice where lec.lecId = :lecId")
    Optional<LectureNoticeRes> updateLecNotice(int lecId, String lecNotice);
}
