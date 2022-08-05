package com.ssafy.db.repository;


import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.db.entity.Lecture;
import com.ssafy.api.response.user.UserMyLectureRes;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, Integer> {

    // 존재하는 강의 중 학생 수가 많은 순서대로(인기순)
    @Query(value = "select lec.lecTitle, lec.lecContents, lec.lecCategory, lec.lecLevel, lec.lecGenre " +
            "from Enroll e, Lecture lec " +
            "where e.lecture.lecId = lec.lecId and current_date < lec.lecEndDate " +
            "group by lec.lecId " +
            "order by count(e.enrollId) desc")
    Page<Lecture> getMostPopularLecture(Pageable pageable);

    // 존재하는 강의 중 최신순으로(최신순)
    @Query(value = "select lec.lecTitle, lec.lecContents, lec.lecCategory, lec.lecLevel, lec.lecGenre " +
            "from Lecture lec " +
            "where current_date < lec.lecEndDate " +
            "order by lec.lecEndDate desc")
    Page<Lecture> getLecturesByMostLatest(Pageable pageable);

    // 존재하는 강의 / 연령대 / 성별 기준으로
    @Query(value = "select lec.lecTitle, lec.lecContents, lec.lecCategory, lec.lecLevel, lec.lecGenre, u.userGender " +
            "from Enroll e, Lecture lec, User u " +
            "where e.lecture = lec and current_date < lec.lecEndDate and u.userGender = :userGender " +
            "partition by lec.lecId , :userGender, ((extract(year from current_date) - extract(year from u.userBirth) + 1) - ((extract(year from current_date) - extract(year from u.userBirth) + 1) % 10) as age_group) " +
            "order by count(e.enrollId)", nativeQuery = true)
    Page<Lecture> getMostPopularLectureByYourBirthAndGender(Pageable pageable);

    // 공지사항 수정
    @Modifying(clearAutomatically = true)
    @Query(value = "update Lecture lec set lec.lecNotice = :lecNotice where lec.lecId = :lecId", nativeQuery = true)
    Optional<LectureNoticeRes> updateLecNotice(int lecId, String lecNotice);

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
    @Query(value = "select l.lecId, l.lecTitle, l.instructor.ins_name, l.thumbnail from Lecture l join Enroll e on l.lecId = e.lecture.lecId where e.user.userId = :userId order by e.enroll_id desc", nativeQuery = true)
    List<UserMyLectureRes> findLecturesByUserId(String userId);

    Lecture findLectureByLecId(int lecId);

}
