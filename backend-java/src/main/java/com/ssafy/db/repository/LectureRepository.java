package com.ssafy.db.repository;

import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.api.response.user.UserMyLectureRes;
import com.ssafy.db.entity.Lecture;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, String> {
//    Optional<Lecture> findAll(List<Lecture> list);

    @Modifying(clearAutomatically = true)
    @Query("update Lecture lec set lec.lecNotice = :lecNotice where lec.lecId = :lecId")
    Optional<LectureNoticeRes> updatLecNotice(int lecId, String lecNotice);


    @Query("select l.lecId, l.lecTitle, l.instructor.ins_name, l.thumbnail from Lecture l join Enroll e on l.lecId = e.lecture.lecId where e.user.userId = :userId order by e.enrollId desc")
    List<UserMyLectureRes> findLecturesByUserId(String userId, Pageable pageable);

}
