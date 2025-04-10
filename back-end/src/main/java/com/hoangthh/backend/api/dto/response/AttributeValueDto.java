package com.hoangthh.backend.api.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AttributeValueDto {
    private Long id;
    private String valueName;
}
