package com.hoangthh.backend.core.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VariantAttributeCore {
    private Long id;
    private AttributeValueCore attributeValue;
}
