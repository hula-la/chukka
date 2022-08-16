package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEnroll is a Querydsl query type for Enroll
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QEnroll extends EntityPathBase<Enroll> {

    private static final long serialVersionUID = 1316205288L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEnroll enroll = new QEnroll("enroll");

    public final NumberPath<Integer> enrollId = createNumber("enrollId", Integer.class);

    public final QLecture lecture;

    public final NumberPath<Integer> status = createNumber("status", Integer.class);

    public final QUser user;

    public QEnroll(String variable) {
        this(Enroll.class, forVariable(variable), INITS);
    }

    public QEnroll(Path<? extends Enroll> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEnroll(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEnroll(PathMetadata metadata, PathInits inits) {
        this(Enroll.class, metadata, inits);
    }

    public QEnroll(Class<? extends Enroll> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.lecture = inits.isInitialized("lecture") ? new QLecture(forProperty("lecture"), inits.get("lecture")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

