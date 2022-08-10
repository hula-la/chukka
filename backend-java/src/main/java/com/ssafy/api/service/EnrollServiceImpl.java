package com.ssafy.api.service;

import com.ssafy.db.entity.Enroll;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.EnrollRepository;
import com.ssafy.db.repository.LectureRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollServiceImpl implements EnrollService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    LectureRepository lectureRepository;
    @Autowired
    EnrollRepository enrollRepository;

    public void createEnroll(String userId, List<Integer> lecIds) {
        Optional<User> user = userRepository.findByUserId(userId);
        if(user != null){
            for (int i = 0; i < lecIds.size(); i++) {
                Lecture lecture = lectureRepository.findLectureByLecId(lecIds.get(i));
                Enroll enroll = Enroll.builder()
                        .user(user.get())
                        .lecture(lecture)
                        .status(0)
                        .build();
                enrollRepository.save(enroll);
            }
        }
    }
}

