package com.ssafy.chukka.model;

import lombok.Data;

@Data
public class Member {

    private String userid;
    private String password;
    private String username;
    private String phone;
    private String email;
    private int gender;
    private int point;
    private int age;
    private String nickname;
    private String userProfile;
    private int userLevelLec;
    private int userLevelTik;
    private int userLevelGame;

}
