package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInstructor is a Querydsl query type for Instructor
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QInstructor extends EntityPathBase<Instructor> {

    private static final long serialVersionUID = 41992671L;

    public static final QInstructor instructor = new QInstructor("instructor");

    public final StringPath insEmail = createString("insEmail");

    public final StringPath insId = createString("insId");

    public final StringPath insIntroduce = createString("insIntroduce");

    public final StringPath insName = createString("insName");

    public final StringPath insProfile = createString("insProfile");

    public final ListPath<Lecture, QLecture> lectures = this.<Lecture, QLecture>createList("lectures", Lecture.class, QLecture.class, PathInits.DIRECT2);

    public final ListPath<Section, QSection> sections = this.<Section, QSection>createList("sections", Section.class, QSection.class, PathInits.DIRECT2);

    public QInstructor(String variable) {
        super(Instructor.class, forVariable(variable));
    }

    public QInstructor(Path<? extends Instructor> path) {
        super(path.getType(), path.getMetadata());
    }

    public QInstructor(PathMetadata metadata) {
        super(Instructor.class, metadata);
    }

}

