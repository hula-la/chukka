package com.ssafy.db.specification;

import com.ssafy.db.entity.Snacks;
import com.ssafy.db.entity.SnacksTag;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Expression;

public class SnacksTagSpecification {

    public static Specification<SnacksTag> tagContains(String tags) {
        return (root, query, builder) -> {
            Expression<String> tagLowerCase = builder.lower(root.get("snacksTagContent"));
            return builder.like(tagLowerCase, tags.toLowerCase());
        };
    }

}
