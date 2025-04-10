package com.hoangthh.backend.core.service;

import com.hoangthh.backend.api.dto.request.AttributeRequest;
import com.hoangthh.backend.core.domain.AttributeCore;
import com.hoangthh.backend.core.service.provider.AttributeProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttributeService {
    private final AttributeProvider attributeProvider;

    public String createAttribute(AttributeRequest request) {

        try {
            attributeProvider.save(request);
            return "Attribute created successfully";
        }
        catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    public List<AttributeCore> getAllAttributes() {
        try {
            return attributeProvider.findAll();
        }
        catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }
}
