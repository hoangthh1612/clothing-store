package com.hoangthh.backend.core.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeValueCore {
    private Long id;
    private String valueName;
    private Long attributeId;
    private String attributeName;
}
