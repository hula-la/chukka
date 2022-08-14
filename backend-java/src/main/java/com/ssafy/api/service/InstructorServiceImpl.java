package com.ssafy.api.service;


import com.ssafy.api.request.instructor.InstructorPostReq;
import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.request.lecture.LectureUpdateReq;
import com.ssafy.api.response.admin.InstructorRes;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.repository.InstructorRepository;
import com.ssafy.db.repository.LectureRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * 강사 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("InstructorService")
public class InstructorServiceImpl implements InstructorService {
    @Autowired
    InstructorRepository instructorRepository;
    @Autowired
    UserRepository userRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.region.static}")
    private String region;

    @Override
    public Instructor createInstructor(String insId) {
        Instructor ins = Instructor.builder()
                .insId(insId)
                .insProfile("https://" + bucket + ".s3." + region + ".amazonaws.com/img/instructor/profile/" + insId).build();
        return instructorRepository.save(ins);
    }

    @Override
    public Instructor updateInstructor(InstructorPostReq insInfo) {
        Optional<Instructor> instructor = instructorRepository.findByInsId(insInfo.getInsId());
        if(instructor.isPresent()) {
            Instructor ins = Instructor.builder().insId(insInfo.getInsId())
                    .insName(insInfo.getInsName())
                    .insEmail(insInfo.getInsEmail())
                    .insIntroduce(insInfo.getInsIntroduce())
                    .insProfile(instructor.get().getInsProfile()).build();
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
            userRepository.updateUserType(insId, 0);
            return true;
        }
        return false;
    }


}
