package com.hoangthh.backend.api.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AttributeRequest {
    private String attributeName;
    private List<AttributeValueRequest> attributeValues;
}
