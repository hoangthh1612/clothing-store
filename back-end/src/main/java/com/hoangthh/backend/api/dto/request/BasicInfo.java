package com.hoangthh.backend.api.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BasicInfo {
    private String categoryName;
    private String productName;
    private String description;
    private String brand;
    private String imageUrl;
}
