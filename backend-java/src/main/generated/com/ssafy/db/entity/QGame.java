package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QGame is a Querydsl query type for Game
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QGame extends EntityPathBase<Game> {

    private static final long serialVersionUID = 846108340L;

    public static final QGame game = new QGame("game");

    public final StringPath fileName = createString("fileName");

    public final NumberPath<Integer> level = createNumber("level", Integer.class);

    public final StringPath singer = createString("singer");

    public final NumberPath<Long> songId = createNumber("songId", Long.class);

    public final StringPath songName = createString("songName");

    public final StringPath thumbnailUrl = createString("thumbnailUrl");

    public QGame(String variable) {
        super(Game.class, forVariable(variable));
    }

    public QGame(Path<? extends Game> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGame(PathMetadata metadata) {
        super(Game.class, metadata);
    }

}

