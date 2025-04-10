package com.hoangthh.backend.api.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AttributeDto {
    private Long id;
    private String attributeName;
    private List<AttributeValueDto> attributeValues;
}
