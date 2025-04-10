package com.hoangthh.backend.core.service;

import com.hoangthh.backend.core.domain.CategoryCore;
import com.hoangthh.backend.core.service.provider.CategoryProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class CategoryService {
    private final CategoryProvider categoryProvider;

    public String createCategory(String categoryName) {
        try {
            categoryProvider.save(categoryName);
            return "Category created successfully";
        }
        catch (Exception e) {
            throw new RuntimeException("Error saving category", e);
        }

    }

    public List<CategoryCore> getCategories() {
        return categoryProvider.findALl();
    }
}
