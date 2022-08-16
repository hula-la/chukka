package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSnacksTag is a Querydsl query type for SnacksTag
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSnacksTag extends EntityPathBase<SnacksTag> {

    private static final long serialVersionUID = 233889267L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSnacksTag snacksTag = new QSnacksTag("snacksTag");

    public final QSnacks snacks;

    public final DatePath<java.util.Date> snacksRegdate = createDate("snacksRegdate", java.util.Date.class);

    public final StringPath snacksTagContent = createString("snacksTagContent");

    public final NumberPath<Integer> SnacksTagId = createNumber("SnacksTagId", Integer.class);

    public QSnacksTag(String variable) {
        this(SnacksTag.class, forVariable(variable), INITS);
    }

    public QSnacksTag(Path<? extends SnacksTag> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSnacksTag(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSnacksTag(PathMetadata metadata, PathInits inits) {
        this(SnacksTag.class, metadata, inits);
    }

    public QSnacksTag(Class<? extends SnacksTag> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.snacks = inits.isInitialized("snacks") ? new QSnacks(forProperty("snacks"), inits.get("snacks")) : null;
    }

}

