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
        Optional<User> findUser = userRepository.findByUserId(userId);
        if(findUser.isPresent()){
            User user = findUser.get();
            Date birth = user.getUserBirth();
            LocalDateTime today = LocalDateTime.now();
            int userYear = Integer.parseInt(birth.toString().substring(0,4));
            int ageGroup = (today.getYear() - userYear  + 1) / 10 ;
            System.out.println(ageGroup);
            for (int i = 0; i < lecIds.size(); i++) {
                System.out.println(i);
                Lecture lecture = lectureRepository.findLectureByLecId(lecIds.get(i));
                Enroll enroll = Enroll.builder()
                        .user(user)
                        .lecture(lecture)
                        .status(0)
                        .ageGroup(ageGroup)
                        .build();
                System.out.println("=========");
                System.out.println(enroll);
                enrollRepository.save(enroll);
            }
        }
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

