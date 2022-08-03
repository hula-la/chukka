package com.ssafy.db.repository;

import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SectionRepository extends JpaRepository<Section, Integer> {

    // 소강의 불러오기
    List<Section> findByLecture_LecIdOrderBySecId(int lecId);

}
