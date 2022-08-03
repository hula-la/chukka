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


    // 존재하는 강의 중 학생 수가 많은 순서대로
    @Query(value = "select lec.thumbnail, lec.lecTitle, lec.lecContents, lec.lecCategory, lec.lecLevel, lec.lecGenre " +
            "from Enroll e, Lecture lec " +
            "where e.lecture = lec and current_date < lec.lecEndDate " +
            "group by lec.lecId " +
            "order by count(lec.lecId) desc", nativeQuery = true)
    Page<Lecture> getMostPopularLecture(Pageable pageable);

    // 존재하는 강의 중 최신순으로
    @Query(value = "select lec.thumbnail, lec.lecTitle, lec.lecContents, lec.lecCategory, lec.lecLevel, lec.lecGenre " +
            "from Lecture lec " +
            "where current_date < lec.lecEndDate " +
            "order by lec.lecEndDate desc")
    Page<Lecture> getLecturesByMostLatest(Pageable pageable);

    // 존재하는 강의 / 연령대 / 성별 기준으로
//    @Query(value = "select lec.thumbnail, lec.lecTitle, lec.lecContents, lec.lecCategory, lec.lecLevel, lec.lecGenre, u.userGender, " +
//            "case " +
//            "when a.age < 20 then '10대' " +
//            "when a.age < 30 then '20대' " +
//            "when a.age < 40 then '30대' " +
//            "when a.age < 50 then '40대'" +
//            "end as age_group " +
//            "from Enroll e, Lecture lec, User u , (select *, floor(date_format(now(), '%y')-substring(userBirth,1,4)) as age from User) a " +
//            "where e.lecture = lec and current_date < lec.lecEndDate and u.userGender = :userGender " +
//            "group by lec.lecId " +
//            "order by count(age_group)" +
//            "limit 10", nativeQuery = true)
//    List<Lecture> getMostPopularLectureByYourBirthAndGender(String userId);

    // 공지사항 수정
    @Modifying(clearAutomatically = true)
    @Query(value = "update Lecture lec set lec.lecNotice = :lecNotice where lec.lecId = :lecId", nativeQuery = true)
    Optional<LectureNoticeRes> updateLecNotice(int lecId, String lecNotice);

    // 강의 수정
    @Modifying(clearAutomatically = true)
    @Query(value = "update Lecture lec " +
            "set lec.lecId = :lecId +" +
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

    // 본인이 수강중인 강의 조회
    @Query(value = "select l.lecId, l.lecTitle, l.instructor.ins_name, l.thumbnail from Lecture l join Enroll e on l.lecId = e.lecture.lecId where e.user.userId = :userId order by e.enroll_id desc", nativeQuery = true)
    List<UserMyLectureRes> findLecturesByUserId(String userId, Pageable pageable);

}
