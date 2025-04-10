package com.hoangthh.backend.core.domain;

import com.hoangthh.backend.api.dto.response.AttributeValueDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder

public class AttributeCore {
    private Long id;
    private String attributeName;
    private List<AttributeValueCore> attributeValues;
}
