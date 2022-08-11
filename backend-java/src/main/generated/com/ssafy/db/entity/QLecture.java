package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLecture is a Querydsl query type for Lecture
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QLecture extends EntityPathBase<Lecture> {

    private static final long serialVersionUID = -501107844L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLecture lecture = new QLecture("lecture");

    public final ListPath<CartItem, QCartItem> cartItems = this.<CartItem, QCartItem>createList("cartItems", CartItem.class, QCartItem.class, PathInits.DIRECT2);

    public final StringPath dayAndTime = createString("dayAndTime");

    public final ListPath<Enroll, QEnroll> enrolls = this.<Enroll, QEnroll>createList("enrolls", Enroll.class, QEnroll.class, PathInits.DIRECT2);

    public final QInstructor instructor;

    public final NumberPath<Integer> lecCategory = createNumber("lecCategory", Integer.class);

    public final StringPath lecContents = createString("lecContents");

    public final DatePath<java.util.Date> lecEndDate = createDate("lecEndDate", java.util.Date.class);

    public final StringPath lecGenre = createString("lecGenre");

    public final NumberPath<Integer> lecId = createNumber("lecId", Integer.class);

    public final NumberPath<Integer> lecLevel = createNumber("lecLevel", Integer.class);

    public final NumberPath<Integer> lecLimit = createNumber("lecLimit", Integer.class);

    public final StringPath lecNotice = createString("lecNotice");

    public final NumberPath<Integer> lecPrice = createNumber("lecPrice", Integer.class);

    public final DatePath<java.util.Date> lecRegDate = createDate("lecRegDate", java.util.Date.class);

    public final StringPath lecSchedule = createString("lecSchedule");

    public final DatePath<java.util.Date> lecStartDate = createDate("lecStartDate", java.util.Date.class);

    public final NumberPath<Integer> lecStudent = createNumber("lecStudent", Integer.class);

    public final StringPath lecThumb = createString("lecThumb");

    public final StringPath lecTitle = createString("lecTitle");

    public final ListPath<PayList, QPayList> payLists = this.<PayList, QPayList>createList("payLists", PayList.class, QPayList.class, PathInits.DIRECT2);

    public final ListPath<Review, QReview> reviews = this.<Review, QReview>createList("reviews", Review.class, QReview.class, PathInits.DIRECT2);

    public final ListPath<Section, QSection> sections = this.<Section, QSection>createList("sections", Section.class, QSection.class, PathInits.DIRECT2);

    public QLecture(String variable) {
        this(Lecture.class, forVariable(variable), INITS);
    }

    public QLecture(Path<? extends Lecture> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLecture(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLecture(PathMetadata metadata, PathInits inits) {
        this(Lecture.class, metadata, inits);
    }

    public QLecture(Class<? extends Lecture> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.instructor = inits.isInitialized("instructor") ? new QInstructor(forProperty("instructor")) : null;
    }

}

