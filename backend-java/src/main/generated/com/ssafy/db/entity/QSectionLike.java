package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSectionLike is a Querydsl query type for SectionLike
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSectionLike extends EntityPathBase<SectionLike> {

    private static final long serialVersionUID = 1574838042L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSectionLike sectionLike = new QSectionLike("sectionLike");

    public final NumberPath<Integer> likeId = createNumber("likeId", Integer.class);

    public final QSection section;

    public final QUser user;

    public QSectionLike(String variable) {
        this(SectionLike.class, forVariable(variable), INITS);
    }

    public QSectionLike(Path<? extends SectionLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSectionLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSectionLike(PathMetadata metadata, PathInits inits) {
        this(SectionLike.class, metadata, inits);
    }

    public QSectionLike(Class<? extends SectionLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.section = inits.isInitialized("section") ? new QSection(forProperty("section"), inits.get("section")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

