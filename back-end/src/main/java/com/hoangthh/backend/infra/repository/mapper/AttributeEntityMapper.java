package com.hoangthh.backend.infra.repository.mapper;

import com.hoangthh.backend.core.domain.AttributeCore;
import com.hoangthh.backend.core.domain.AttributeValueCore;
import com.hoangthh.backend.infra.repository.db.entity.Attribute;
import org.springframework.stereotype.Component;

@Component

public class AttributeEntityMapper {
    public AttributeCore toDomain(Attribute attribute) {
        return AttributeCore.builder()
                .attributeName(attribute.getAttributeName())
                .id(attribute.getId())
                .attributeValues(attribute.getAttributeValues().stream().map(
                        (value) -> AttributeValueCore.builder()
                                .id(value.getId())
                                .valueName(value.getValueName())
                                .build()
                ).toList())
                .build();
    }
}
