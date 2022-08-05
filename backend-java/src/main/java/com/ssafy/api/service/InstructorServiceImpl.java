package com.ssafy.api.service;


import com.ssafy.api.request.instructor.InstructorPostReq;
import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.request.lecture.LectureUpdateReq;
import com.ssafy.api.response.admin.InstructorRes;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.repository.InstructorRepository;
import com.ssafy.db.repository.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 강사 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("InstructorService")
public class InstructorServiceImpl implements InstructorService {
    @Autowired
    InstructorRepository instructorRepository;

    @Override
    public Instructor createInstructor(String insId) {
        Instructor ins = Instructor.builder().insId(insId).build();
        return instructorRepository.save(ins);
    }

    @Override
    public Instructor updateInstructor(InstructorPostReq insInfo) {
        if(instructorRepository.findById(insInfo.getInsId()).isPresent()) {
            Instructor ins = Instructor.builder().insId(insInfo.getInsId())
                    .insName(insInfo.getInsName())
                    .insEmail(insInfo.getInsEmail())
                    .insIntroduce(insInfo.getInsIntroduce()).build();
            return instructorRepository.save(ins);
        }
        return null;
    }

    @Override
    public List<InstructorRes> findAll() {
        List<Instructor> instructors = instructorRepository.findAll();
        List<InstructorRes> list = new ArrayList<>();
        for (int i = 0; i < instructors.size(); i++) {
            list.add(InstructorRes.of(instructors.get(i)));
        }
        return list;
    }

    @Override
    public boolean deleteInstructor(String insId) {
        if(instructorRepository.findById(insId).isPresent()) {
            instructorRepository.delete(Instructor.builder().insId(insId).build());
            return true;
        }
        return false;
    }


}
