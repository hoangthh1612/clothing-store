package com.hoangthh.backend.core.domain;

import com.hoangthh.backend.api.dto.response.AttributeValueDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class AttributeCore {
    private Long id;
    private String attributeName;
    private List<AttributeValueCore> attributeValues;
}
