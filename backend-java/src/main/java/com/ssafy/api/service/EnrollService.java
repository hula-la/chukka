package com.ssafy.api.service;

import com.ssafy.db.entity.Enroll;

import java.util.List;


public interface EnrollService {
    /*  수강 강의 추가  */
    void createEnroll(String userId, List<Integer> lecIds);

    Enroll getEnrollByUserId(String userId);

    Enroll getEnrollByUserAndLecture(String userId, int lecId);
}
