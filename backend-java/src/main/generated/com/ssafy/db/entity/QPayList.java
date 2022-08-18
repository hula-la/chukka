package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPayList is a Querydsl query type for PayList
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPayList extends EntityPathBase<PayList> {

    private static final long serialVersionUID = -1341462684L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPayList payList = new QPayList("payList");

    public final QLecture lecture;

    public final StringPath merchant_uid = createString("merchant_uid");

    public final QPay pay;

    public final NumberPath<Integer> paylistId = createNumber("paylistId", Integer.class);

    public final QUser user;

    public QPayList(String variable) {
        this(PayList.class, forVariable(variable), INITS);
    }

    public QPayList(Path<? extends PayList> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPayList(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPayList(PathMetadata metadata, PathInits inits) {
        this(PayList.class, metadata, inits);
    }

    public QPayList(Class<? extends PayList> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.lecture = inits.isInitialized("lecture") ? new QLecture(forProperty("lecture"), inits.get("lecture")) : null;
        this.pay = inits.isInitialized("pay") ? new QPay(forProperty("pay"), inits.get("pay")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

