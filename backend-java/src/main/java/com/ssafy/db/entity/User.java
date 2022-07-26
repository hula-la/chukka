package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter @Setter
public class User{

    @Id
    @Column(name = "user_id")
    private String userId;

    private String userName;
    private String userPhone;
    private String userEmail;
    private int userGender;
    private int userPoint;
    private Date userBirth;
    private String userNickname;
    private String userProfile;
    private String userAccessToken;

    // 경험치 관련
    private int userLvLec;
    private int userLvSnacks;
    private int userLvGame;
    
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String userPw;

    // Snacks 좋아요!
    @OneToMany(mappedBy = "user")
    private List<SnacksLike> likeUsers = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Cart> carts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Enroll> enrolls = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Pay> pays = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<PayList> payLists = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<SectionLike> sectionLikes = new ArrayList<>();

}
