package com.hoangthh.backend.api.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@Builder

public class SaleInfo {
    private List<AttributeRequest> attributes;
    private List<VariantRequest> variants;
}
