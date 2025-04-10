package com.hoangthh.backend.core.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VariantAttributeCore {
    private Long id;
    private AttributeValueCore attributeValue;
}
