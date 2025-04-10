package com.hoangthh.backend.core.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AttributeValueCore {
    private Long id;
    private String valueName;
    private Long attributeId;
}
