package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPay is a Querydsl query type for Pay
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPay extends EntityPathBase<Pay> {

    private static final long serialVersionUID = -1219623514L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPay pay = new QPay("pay");

    public final NumberPath<Integer> payAmount = createNumber("payAmount", Integer.class);

    public final DatePath<java.util.Date> payDate = createDate("payDate", java.util.Date.class);

    public final NumberPath<Integer> payId = createNumber("payId", Integer.class);

    public final ListPath<PayList, QPayList> payLists = this.<PayList, QPayList>createList("payLists", PayList.class, QPayList.class, PathInits.DIRECT2);

    public final StringPath payMethod = createString("payMethod");

    public final StringPath payUid = createString("payUid");

    public final QUser user;

    public QPay(String variable) {
        this(Pay.class, forVariable(variable), INITS);
    }

    public QPay(Path<? extends Pay> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPay(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPay(PathMetadata metadata, PathInits inits) {
        this(Pay.class, metadata, inits);
    }

    public QPay(Class<? extends Pay> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

