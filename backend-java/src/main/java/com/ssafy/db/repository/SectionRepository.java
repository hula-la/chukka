package com.ssafy.db.repository;

import com.ssafy.api.response.section.SectionGetRes;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SectionRepository extends JpaRepository<Section, Integer> {

    // 현재 해당하는 강의의 섹션만 불러오기
    @Query(value = "select s.secId, s.secTitle, s.secContents, s.secRegDate " +
            "from Section s " +
            "where s.lecture.lecId = :lecId " +
            "order by s.secId")
    List<SectionGetRes> getSectionByLecId(int lecId);

    // 해당 섹션 하나만 가져오기
    @Query(value = "select * from Section where secId = :secId", nativeQuery = true)
    Section findById(int secId);

    // 소강의 수정하기
    @Modifying(clearAutomatically = true)
    @Query(value = "update Section sec " +
            "set sec.secId = :secId," +
            "sec.Instructor = :instructor," +
            "sec.secTitle = :secTitle," +
            "sec.secContents = :secContents " +
            "where sec.secId = :secId", nativeQuery = true)
    Optional<Integer> updateSection(int secId, Instructor instructor, String secTitle, String secContents);

}
