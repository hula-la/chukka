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
//    Optional<Lecture> findAll(List<Lecture> list);

    @Modifying(clearAutomatically = true)
    @Query("update Lecture lec set lec.lecNotice = :lecNotice where lec.lecId = :lecId")
    Optional<LectureNoticeRes> updatLecNotice(int lecId, String lecNotice);
}
