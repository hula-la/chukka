package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSnacksReply is a Querydsl query type for SnacksReply
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSnacksReply extends EntityPathBase<SnacksReply> {

    private static final long serialVersionUID = 1427570435L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSnacksReply snacksReply = new QSnacksReply("snacksReply");

    public final StringPath contents = createString("contents");

    public final NumberPath<Integer> replyId = createNumber("replyId", Integer.class);

    public final DatePath<java.util.Date> replyRegdate = createDate("replyRegdate", java.util.Date.class);

    public final QSnacks snacks;

    public final QUser user;

    public QSnacksReply(String variable) {
        this(SnacksReply.class, forVariable(variable), INITS);
    }

    public QSnacksReply(Path<? extends SnacksReply> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSnacksReply(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSnacksReply(PathMetadata metadata, PathInits inits) {
        this(SnacksReply.class, metadata, inits);
    }

    public QSnacksReply(Class<? extends SnacksReply> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.snacks = inits.isInitialized("snacks") ? new QSnacks(forProperty("snacks"), inits.get("snacks")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

