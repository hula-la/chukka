package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 846542477L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final QCart cart;

    public final ListPath<Enroll, QEnroll> enrolls = this.<Enroll, QEnroll>createList("enrolls", Enroll.class, QEnroll.class, PathInits.DIRECT2);

    public final ListPath<SnacksLike, QSnacksLike> likeUsers = this.<SnacksLike, QSnacksLike>createList("likeUsers", SnacksLike.class, QSnacksLike.class, PathInits.DIRECT2);

    public final ListPath<PayList, QPayList> payLists = this.<PayList, QPayList>createList("payLists", PayList.class, QPayList.class, PathInits.DIRECT2);

    public final ListPath<Pay, QPay> pays = this.<Pay, QPay>createList("pays", Pay.class, QPay.class, PathInits.DIRECT2);

    public final ListPath<Review, QReview> reviews = this.<Review, QReview>createList("reviews", Review.class, QReview.class, PathInits.DIRECT2);

    public final ListPath<SectionLike, QSectionLike> sectionLikes = this.<SectionLike, QSectionLike>createList("sectionLikes", SectionLike.class, QSectionLike.class, PathInits.DIRECT2);

    public final ListPath<SnacksLike, QSnacksLike> snacksLikes = this.<SnacksLike, QSnacksLike>createList("snacksLikes", SnacksLike.class, QSnacksLike.class, PathInits.DIRECT2);

    public final ListPath<Snacks, QSnacks> snacksList = this.<Snacks, QSnacks>createList("snacksList", Snacks.class, QSnacks.class, PathInits.DIRECT2);

    public final ListPath<SnacksReply, QSnacksReply> snacksReplies = this.<SnacksReply, QSnacksReply>createList("snacksReplies", SnacksReply.class, QSnacksReply.class, PathInits.DIRECT2);

    public final DatePath<java.util.Date> userBirth = createDate("userBirth", java.util.Date.class);

    public final StringPath userEmail = createString("userEmail");

    public final NumberPath<Integer> userGender = createNumber("userGender", Integer.class);

    public final StringPath userId = createString("userId");

    public final NumberPath<Integer> userLvGame = createNumber("userLvGame", Integer.class);

    public final NumberPath<Integer> userLvLec = createNumber("userLvLec", Integer.class);

    public final NumberPath<Integer> userLvSnacks = createNumber("userLvSnacks", Integer.class);

    public final StringPath userName = createString("userName");

    public final StringPath userNickname = createString("userNickname");

    public final StringPath userPhone = createString("userPhone");

    public final NumberPath<Integer> userPoint = createNumber("userPoint", Integer.class);

    public final StringPath userProfile = createString("userProfile");

    public final StringPath userPw = createString("userPw");

    public final StringPath userRefreshToken = createString("userRefreshToken");

    public final NumberPath<Integer> userType = createNumber("userType", Integer.class);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.cart = inits.isInitialized("cart") ? new QCart(forProperty("cart"), inits.get("cart")) : null;
    }

}

