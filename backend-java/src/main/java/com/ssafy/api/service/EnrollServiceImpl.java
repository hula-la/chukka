package com.ssafy.api.service;

import com.ssafy.db.entity.Enroll;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.EnrollRepository;
import com.ssafy.db.repository.LectureRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
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

    public int createEnroll(String userId, List<Integer> lecIds) {
        Optional<User> findUser = userRepository.findByUserId(userId);
        if(findUser.isPresent()){
            User user = findUser.get();
            Date birth = user.getUserBirth();
            LocalDateTime today = LocalDateTime.now();
            int userYear = Integer.parseInt(birth.toString().substring(0,4));
            int ageGroup = ((today.getYear() - userYear  + 1) / 10 )*10;
            for (int ledId : lecIds) {
                System.out.println(ledId);
                Lecture lecture = lectureRepository.findLectureByLecId(ledId);

                Enroll enroll = Enroll.builder()
                        .user(user)
                        .lecture(lecture)
                        .status(0)
                        .ageGroup(ageGroup)
                        .build();
                System.out.println("=========");
                enroll = enrollRepository.save(enroll);
                if(enroll == null) return 0;
                if(lectureRepository.updateLectureStudent(ledId) != 1) return 0;
            }
            return 1;
        }
        return 0;
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

    @Override
    public boolean findByLecIdAnsUserId(int ledId, String userId) {
        Optional<Enroll> enroll = enrollRepository.findByLecture_LecIdAndUser_UserId(ledId, userId);
        if(enroll.isPresent()){ // 수강 중임
            return true;
        }
        return false;
    }
}

