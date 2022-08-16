package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSnacksLike is a Querydsl query type for SnacksLike
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSnacksLike extends EntityPathBase<SnacksLike> {

    private static final long serialVersionUID = -1339597730L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSnacksLike snacksLike = new QSnacksLike("snacksLike");

    public final DatePath<java.util.Date> likeSnacksReg = createDate("likeSnacksReg", java.util.Date.class);

    public final QSnacks snacks;

    public final NumberPath<Integer> snacksLikeId = createNumber("snacksLikeId", Integer.class);

    public final QUser user;

    public QSnacksLike(String variable) {
        this(SnacksLike.class, forVariable(variable), INITS);
    }

    public QSnacksLike(Path<? extends SnacksLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSnacksLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSnacksLike(PathMetadata metadata, PathInits inits) {
        this(SnacksLike.class, metadata, inits);
    }

    public QSnacksLike(Class<? extends SnacksLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.snacks = inits.isInitialized("snacks") ? new QSnacks(forProperty("snacks"), inits.get("snacks")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

