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
        if(user != null){
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
    public Enroll getEnrollByUserId(String userId) {
        User user = userRepository.findUserByUserId(userId);
        Enroll enroll = enrollRepository.getEnrollByUser(user);
        return enroll;
    }

    @Override
    public Enroll getEnrollByUserAndLecture(String userId, int lecId) {
        User user = userRepository.findUserByUserId(userId);
        Lecture lec = lectureRepository.findLectureByLecId(lecId);
        Enroll enroll = enrollRepository.getEnrollByUserAndLecture(user, lec);
        return enroll;
    }
}

