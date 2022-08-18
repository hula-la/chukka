package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSnacks is a Querydsl query type for Snacks
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSnacks extends EntityPathBase<Snacks> {

    private static final long serialVersionUID = 1716495399L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSnacks snacks = new QSnacks("snacks");

    public final StringPath snacksContents = createString("snacksContents");

    public final NumberPath<Long> snacksId = createNumber("snacksId", Long.class);

    public final NumberPath<Long> snacksLikeCnt = createNumber("snacksLikeCnt", Long.class);

    public final ListPath<SnacksLike, QSnacksLike> snacksLikes = this.<SnacksLike, QSnacksLike>createList("snacksLikes", SnacksLike.class, QSnacksLike.class, PathInits.DIRECT2);

    public final DatePath<java.util.Date> snacksRegdate = createDate("snacksRegdate", java.util.Date.class);

    public final ListPath<SnacksReply, QSnacksReply> snacksReplies = this.<SnacksReply, QSnacksReply>createList("snacksReplies", SnacksReply.class, QSnacksReply.class, PathInits.DIRECT2);

    public final ListPath<SnacksTag, QSnacksTag> snacksTags = this.<SnacksTag, QSnacksTag>createList("snacksTags", SnacksTag.class, QSnacksTag.class, PathInits.DIRECT2);

    public final StringPath snacksTitle = createString("snacksTitle");

    public final QUser user;

    public QSnacks(String variable) {
        this(Snacks.class, forVariable(variable), INITS);
    }

    public QSnacks(Path<? extends Snacks> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSnacks(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSnacks(PathMetadata metadata, PathInits inits) {
        this(Snacks.class, metadata, inits);
    }

    public QSnacks(Class<? extends Snacks> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

