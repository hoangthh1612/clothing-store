package com.hoangthh.backend.api.controller.cms;

import com.hoangthh.backend.api.dto.request.CategoryRequest;
import com.hoangthh.backend.api.dto.response.CategoryDto;
import com.hoangthh.backend.api.mapper.CategoryMapper;
import com.hoangthh.backend.core.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor

@RequestMapping("/api/cms-category")
public class CmsCategory {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody CategoryRequest request) {
        return ResponseEntity.ok(categoryService.createCategory(request.getCategoryName()));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<CategoryDto>> getAll() {
        return ResponseEntity.ok(categoryService.getCategories().stream().map(categoryMapper::toDto).toList());
    }
}
