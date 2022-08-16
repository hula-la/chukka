package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSection is a Querydsl query type for Section
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSection extends EntityPathBase<Section> {

    private static final long serialVersionUID = 1416439011L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSection section = new QSection("section");

    public final QInstructor instructor;

    public final QLecture lecture;

    public final StringPath secContents = createString("secContents");

    public final NumberPath<Integer> secId = createNumber("secId", Integer.class);

    public final DatePath<java.util.Date> secRegDate = createDate("secRegDate", java.util.Date.class);

    public final ListPath<SectionLike, QSectionLike> sectionLikes = this.<SectionLike, QSectionLike>createList("sectionLikes", SectionLike.class, QSectionLike.class, PathInits.DIRECT2);

    public final StringPath secTitle = createString("secTitle");

    public QSection(String variable) {
        this(Section.class, forVariable(variable), INITS);
    }

    public QSection(Path<? extends Section> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSection(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSection(PathMetadata metadata, PathInits inits) {
        this(Section.class, metadata, inits);
    }

    public QSection(Class<? extends Section> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.instructor = inits.isInitialized("instructor") ? new QInstructor(forProperty("instructor")) : null;
        this.lecture = inits.isInitialized("lecture") ? new QLecture(forProperty("lecture"), inits.get("lecture")) : null;
    }

}

