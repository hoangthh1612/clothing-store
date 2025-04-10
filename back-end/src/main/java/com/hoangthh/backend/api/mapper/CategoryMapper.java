package com.hoangthh.backend.api.mapper;

import com.hoangthh.backend.api.dto.response.CategoryDto;
import com.hoangthh.backend.core.domain.CategoryCore;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public CategoryDto toDto(CategoryCore category) {
        return CategoryDto.builder()
                .id(category.getId())
                .categoryName(category.getCategoryName())
                .build();
    }
}
