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

    // 경험치 관련
    private Integer userLvLec;
    private Integer userLvSnacks;
    private Integer userLvGame;

    private Integer userGender;
    private String userRefreshToken;

    @Temporal(TemporalType.DATE)
    private Date userBirth;

    private Integer userPoint;
    // 프론트랑 얘기 필요 일단 킵. 근데 아무리 생각해도 백에서 저장할 필요 없음.
    private String userProfile;
    private Integer userType;

    
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String userPw;

    // Snacks 좋아요!
    @OneToMany(mappedBy = "user")
    private List<SnacksHeart> likeUsers = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "cartId")
    private Cart cart;

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
        this.userProfile = this.userProfile == null ? this.userId : this.userProfile;
        this.userType = this.userType == null ? 0 : this.userType;
        this.userLvLec = this.userLvLec == null ? 0 : this.userLvLec;
        this.userLvSnacks = this.userLvSnacks == null ? 0 : this.userLvSnacks;
        this.userLvGame = this.userLvGame == null ? 0 : this.userLvGame;
    }
}
