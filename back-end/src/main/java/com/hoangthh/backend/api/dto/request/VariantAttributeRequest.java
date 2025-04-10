package com.hoangthh.backend.api.dto.request;

import com.hoangthh.backend.infra.repository.db.entity.Attribute;
import com.hoangthh.backend.infra.repository.db.entity.AttributeValue;
import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class VariantAttributeRequest {
    //private Attribute attribute;
    //private AttributeValue attributeValue;
    private Long id;
    private String valueName;
}
