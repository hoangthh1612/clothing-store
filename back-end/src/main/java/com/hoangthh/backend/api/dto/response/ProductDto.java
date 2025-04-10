package com.hoangthh.backend.api.dto.response;

import com.hoangthh.backend.infra.repository.db.entity.Category;
import com.hoangthh.backend.infra.repository.db.entity.Variant;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ProductDto {
    private Long id;

    private CategoryDto category;

    private String name;

    private String description;

    private String imageUrl;

    private List<VariantDto> variants;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}

