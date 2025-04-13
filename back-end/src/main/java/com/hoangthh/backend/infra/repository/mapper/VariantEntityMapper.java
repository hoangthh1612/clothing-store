package com.hoangthh.backend.infra.repository.mapper;

import com.hoangthh.backend.core.domain.AttributeValueCore;
import com.hoangthh.backend.core.domain.VariantAttributeCore;
import com.hoangthh.backend.core.domain.VariantCore;
import com.hoangthh.backend.infra.repository.db.entity.Variant;
import com.hoangthh.backend.infra.repository.db.entity.VariantAttribute;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component

public class VariantEntityMapper {
    public VariantCore toDomain(Variant variant) {
        return VariantCore.builder()
                .id(variant.getId())
                .price(variant.getPrice())
                .stock(variant.getStock())
                .sku(variant.getSku())
                .variantAttributes(variant.getVariantAttributes().stream().map(this::toVariantAttributeCore).toList())
                .build();
    }

    public VariantAttributeCore toVariantAttributeCore(VariantAttribute variantAttribute) {
        return VariantAttributeCore.builder()
                .id(variantAttribute.getId())
                .attributeValue(AttributeValueCore.builder().id(variantAttribute.getAttributeValue().getId())
                        .valueName(variantAttribute.getAttributeValue().getValueName())
                        .attributeId(variantAttribute.getAttributeValue().getAttribute().getId())
                        .attributeName(variantAttribute.getAttributeValue().getAttribute().getAttributeName())
                        .build())
                .build();
    }
}
