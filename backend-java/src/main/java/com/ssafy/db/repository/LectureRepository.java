package com.ssafy.db.repository;


import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.db.entity.Lecture;
import com.ssafy.api.response.user.UserMyLectureRes;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, String> {


    // 전체 강의 목록 조회
    List<Lecture> findAll();

    // 공지사항 수정
    @Modifying(clearAutomatically = true)
    @Query(value = "update Lecture lec set lec.lecNotice = :lecNotice where lec.lecId = :lecId", nativeQuery = true)
    Optional<LectureNoticeRes> updateLecNotice(int lecId, String lecNotice);

    // 강의 수정
    @Modifying(clearAutomatically = true)
    @Query(value = "update Lecture lec " +
            "set lec.lecId = :lecId" +
            "lec.thumbnail = :thumbnail, " +
            "lec.lecTitle = :lecTitle, " +
            "lec.lecContents = :lecContents, " +
            "lec.lecPrice = :lecPrice, " +
            "lec.lecNotice = :lecNotice, " +
            "lec.lecStartDate = :lecStartDate, " +
            "lec.lecEndDate = :lecEndDate, " +
            "lec.lecCategory = :lecCategory, " +
            "lec.lecLevel = :lecLevel, " +
            "lec.lecLimit = :lecLimit, " +
            "lec.lecGenre = :lecGenre " +
            "where lec.lecId = :lecId", nativeQuery = true)
    Optional<Integer> updateLecture(int lecId,
                                    String thumbnail,
                                    String lecTitle,
                                    String lecContents,
                                    int lecPrice,
                                    String lecNotice,
                                    Date lecStartDate,
                                    Date lecEndDate,
                                    int lecCategory,
                                    int lecLevel,
                                    int lecLimit,
                                    String lecGenre);

    // 강의 삭제
    Optional<Integer> deleteByLecId(int lecId);


    @Query("select l.lecId, l.lecTitle, l.instructor.ins_name, l.thumbnail from Lecture l join Enroll e on l.lecId = e.lecture.lecId where e.user.userId = :userId order by e.enrollId desc")
    List<UserMyLectureRes> findLecturesByUserId(String userId, Pageable pageable);

}
