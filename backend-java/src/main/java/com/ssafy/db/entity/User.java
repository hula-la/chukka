package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
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
    private Integer userGender;
    private String userNickname;
    private String userRefreshToken;

    @Temporal(TemporalType.DATE)
    private Date userBirth;

    private Integer userPoint;
    private String userProfile;
    private Integer userType;
    private Integer userLvLec;
    private Integer userLvSnacks;
    private Integer userLvGame;
    
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String userPw;

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

    @PrePersist
    public void prePersist() {
        this.userPoint = this.userPoint == null ? 0 : this.userPoint;
        this.userProfile = this.userProfile == null ? "default.png" : this.userProfile;
        this.userType = this.userType == null ? 0 : this.userType;
        this.userLvLec = this.userLvLec == null ? 0 : this.userLvLec;
        this.userLvSnacks = this.userLvSnacks == null ? 0 : this.userLvSnacks;
        this.userLvGame = this.userLvGame == null ? 0 : this.userLvGame;
    }

}
