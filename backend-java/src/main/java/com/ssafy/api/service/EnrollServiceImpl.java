package com.ssafy.api.service;

import com.ssafy.db.entity.Enroll;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.EnrollRepository;
import com.ssafy.db.repository.LectureRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.lang.Integer.parseInt;

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
        Date birth = user.get().getUserBirth();
        int ageGroup = Integer.parseInt(birth.toString());
        if(user.isPresent()){
            for (int i = 0; i < lecIds.size(); i++) {
                Lecture lecture = lectureRepository.findLectureByLecId(lecIds.get(i));
                Enroll enroll = Enroll.builder()
                        .user(user.get())
                        .lecture(lecture)
                        .status(0)
                        .ageGroup(ageGroup-ageGroup%10)
                        .build();
                enrollRepository.save(enroll);
            }
        }
    }
    @Override
    public boolean findByLecId(int ledId) {
        Optional<Enroll> enroll = enrollRepository.findByLecture_LecId(ledId);
        if(enroll.isPresent()){ // 수강 중임
            return true;
        }
        return false;
    }

}

