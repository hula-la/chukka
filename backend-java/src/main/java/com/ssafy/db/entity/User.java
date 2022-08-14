package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * 유저 모델 정의.
 */
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class User{

    @Id
    @Column(name = "user_id")
    private String userId;

    private String userName;
    private String userPhone;
    private String userEmail;
    private String userNickname;
    @Builder.Default
    private Integer userLvLec = 0;
    @Builder.Default
    private Integer userLvSnacks = 0;
    @Builder.Default
    private Integer userLvGame = 0;
    private Integer userGender;
    private String userRefreshToken;
    private String userProfile;

    @Temporal(TemporalType.DATE)
    private Date userBirth;

    @Builder.Default
    private Integer userPoint = 0;
    @Builder.Default
    private Integer userType = 0;
    
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String userPw;

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SnacksLike> likeUsers = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Enroll> enrolls = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Pay> pays = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<PayList> payLists = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SectionLike> sectionLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Snacks> snacksList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SnacksLike> snacksLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SnacksReply> snacksReplies = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<GameHighScore> gameHighScores = new ArrayList<>();

}
