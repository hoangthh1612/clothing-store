package com.hoangthh.backend.api.controller;

import com.hoangthh.backend.api.dto.response.CategoryDto;
import com.hoangthh.backend.api.mapper.CategoryMapper;
import com.hoangthh.backend.core.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor

@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @GetMapping("/getAll")
    public ResponseEntity<List<CategoryDto>> getCategories() {
        return ResponseEntity.ok(categoryService.getCategories().stream().map(categoryMapper::toDto).toList());
    }
}
