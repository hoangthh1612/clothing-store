package com.hoangthh.backend.infra.repository.service;

import com.hoangthh.backend.core.domain.CategoryCore;
import com.hoangthh.backend.core.service.provider.CategoryProvider;
import com.hoangthh.backend.infra.repository.db.CategoryRepository;
import com.hoangthh.backend.infra.repository.db.entity.Category;
import com.hoangthh.backend.infra.repository.mapper.CategoryEntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CategoryProviderImpl implements CategoryProvider {
    private final CategoryRepository categoryRepository;
    private final CategoryEntityMapper categoryEntityMapper;

    @Override
    public void save(String categoryName) {
        Category category = new Category();
        category.setCategoryName(categoryName);
        categoryRepository.save(category);
    }

    @Override
    public List<CategoryCore> findALl() {
        return categoryRepository.findAll().stream().map(categoryEntityMapper::toDomain).toList();
    }
}
