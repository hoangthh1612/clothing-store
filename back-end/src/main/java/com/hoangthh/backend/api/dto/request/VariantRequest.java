package com.hoangthh.backend.api.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder

public class VariantRequest {
    private Long price;
    private String imageUrl;
    private int stock;
    private List<VariantAttributeRequest> variantAttributes;
}
