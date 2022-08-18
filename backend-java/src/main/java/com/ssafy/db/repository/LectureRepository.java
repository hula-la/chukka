package com.ssafy.db.repository;


import com.ssafy.api.response.lecture.LectureGetForYouRes;
import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.api.response.user.UserMyLectureRes;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, Integer> {

    // 존재하는 강의 중 학생 수가 많은 순서대로(인기순)
    @Query(value = "select lec " +
            "from Enroll e, Lecture lec " +
            "where e.lecture.lecId = lec.lecId " +
            "group by e.lecture.lecId " +
            "order by count(e.enrollId) desc")
    List<Lecture> getMostPopularLecture(Pageable pageable);

    // 존재하는 강의 중 최신순으로(최신순)
    Page<Lecture> findAll(Pageable pageable);

    // 존재하는 강의 / 연령대 / 성별 기준으로
    @Query(value = "select lec " +
            "from Enroll e, Lecture lec " +
            "where e.lecture.lecId = lec.lecId and e.user.userGender = :userGender and e.ageGroup = :ageGroup " +
            "group by e.lecture.lecId " +
            "order by count(e.enrollId) desc")
    List<Lecture> getLectureByYourBirthAndGender(int userGender, int ageGroup, Pageable pageable);

    // 강의 수정
    @Modifying(clearAutomatically = true)
    @Query(value = "update Lecture lec " +
            "set lec.lecId = :lecId, " +
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

    // 본인이 수강중인 강의 조회
    @Query(value = "select l from Lecture l join Enroll e on l.lecId = e.lecture.lecId where e.user.userId = :userId order by e.enrollId desc")
    List<Lecture> findLecturesByUserId(String userId);

    // 공지사항 수정
    @Modifying(clearAutomatically = true)
    @Query(value = "update Lecture lec set lec.lecNotice = :lecNotice where lec.lecId = :lecId")
    void updateLecNotice(int lecId, String lecNotice);

    // 라이브 강의 결제 시 인원 추가
    @Modifying(clearAutomatically = true)
    @Query(value = "update Lecture lec set lec.lecStudent = lec.lecStudent + 1 where lec.lecId = :lecId")
    void updateLecStudent(int lecId);

    Lecture findLectureByLecId(int lecId);

    Instructor getInstructorByLecId(int lecId);

    int getLecCategoryByLecId(int lecId);

    List<Lecture> findAllByInstructor_InsId(String insId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value="update Lecture lec set lec.lecStudent = lec.lecStudent + 1 where lec.lecId = :lecId")
    Integer updateLectureStudent(int lecId);
}
