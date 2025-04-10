package com.hoangthh.backend.api.mapper;

import com.hoangthh.backend.api.dto.response.AttributeDto;
import com.hoangthh.backend.api.dto.response.AttributeValueDto;
import com.hoangthh.backend.core.domain.AttributeCore;
import org.springframework.stereotype.Component;

@Component

public class AttributeMapper {
    public static AttributeDto toDto(AttributeCore attribute) {
        return AttributeDto.builder()
                .id(attribute.getId())
                .attributeName(attribute.getAttributeName())
                .attributeValues(attribute.getAttributeValues().stream().map(
                        (value) -> AttributeValueDto.builder()
                                .valueName(value.getValueName())
                                .id(value.getId())
                                .build()
                ).toList()
                )
                .build();

    }
}
