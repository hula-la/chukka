package com.ssafy.db.repository;

<<<<<<< HEAD
import com.ssafy.api.request.lecture.LectureUpdateReq;
import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.db.entity.Lecture;
import io.swagger.annotations.ApiModelProperty;
=======
import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.api.response.user.UserMyLectureRes;
import com.ssafy.db.entity.Lecture;
import org.springframework.data.domain.Pageable;
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

<<<<<<< HEAD
import java.util.Date;
=======
import javax.swing.text.html.Option;
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c
import java.util.List;
import java.util.Optional;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, String> {
<<<<<<< HEAD

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
=======
//    Optional<Lecture> findAll(List<Lecture> list);

    @Modifying(clearAutomatically = true)
    @Query("update Lecture lec set lec.lecNotice = :lecNotice where lec.lecId = :lecId")
    Optional<LectureNoticeRes> updatLecNotice(int lecId, String lecNotice);


    @Query("select l.lecId, l.lecTitle, l.instructor.ins_name, l.thumbnail from Lecture l join Enroll e on l.lecId = e.lecture.lecId where e.user.userId = :userId order by e.enrollId desc")
    List<UserMyLectureRes> findLecturesByUserId(String userId, Pageable pageable);

>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c
}
