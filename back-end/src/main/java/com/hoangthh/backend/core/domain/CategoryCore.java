package com.hoangthh.backend.core.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryCore {
    private Long id;
    private String categoryName;
}
