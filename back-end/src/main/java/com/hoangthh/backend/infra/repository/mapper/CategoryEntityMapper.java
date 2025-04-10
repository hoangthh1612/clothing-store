package com.hoangthh.backend.infra.repository.mapper;

import com.hoangthh.backend.core.domain.CategoryCore;
import com.hoangthh.backend.infra.repository.db.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryEntityMapper {
    public CategoryCore toDomain(Category category) {
        return CategoryCore.builder()
                .id(category.getId())
                .categoryName(category.getCategoryName())
                .build();
    }
}
