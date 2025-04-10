package com.hoangthh.backend.infra.repository.service;

import com.hoangthh.backend.api.dto.request.AttributeRequest;
import com.hoangthh.backend.api.dto.request.AttributeValueRequest;
import com.hoangthh.backend.core.domain.AttributeCore;
import com.hoangthh.backend.core.service.provider.AttributeProvider;
import com.hoangthh.backend.infra.repository.db.AttributeRepository;
import com.hoangthh.backend.infra.repository.db.entity.Attribute;
import com.hoangthh.backend.infra.repository.db.entity.AttributeValue;
import com.hoangthh.backend.infra.repository.mapper.AttributeEntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AttributeProviderImpl implements AttributeProvider {
    private final AttributeRepository attributeRepository;
    private final AttributeEntityMapper attributeEntityMapper;

    @Override
    public void save(AttributeRequest request) {
        //
        Attribute attribute = new Attribute();

        attribute.setAttributeName(request.getAttributeName());

//        List<AttributeValue> attributeValues = request.getAttributeValues().stream().map(
//                (val) -> {
//                    AttributeValue attributeValue = new AttributeValue();
//                    attributeValue.setValueName(val.getValueName());
//                    attributeValue.setAttribute(attribute);
//                    return attributeValue;
//                }
//        ).toList();
        List<AttributeValue> attributeValues = new ArrayList<>();
        for(AttributeValueRequest value : request.getAttributeValues()) {
            AttributeValue attributeValue = new AttributeValue();
            attributeValue.setValueName(value.getValueName());
            attributeValue.setAttribute(attribute);
            attributeValues.add(attributeValue);
        }

        attribute.setAttributeValues(attributeValues);
        attributeRepository.save(attribute);
    }

    @Override
    public List<AttributeCore> findAll() {
        return attributeRepository.findAll().stream().map(attributeEntityMapper::toDomain).toList();
    }
}
