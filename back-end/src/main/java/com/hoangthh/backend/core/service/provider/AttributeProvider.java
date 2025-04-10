package com.hoangthh.backend.core.service.provider;


import com.hoangthh.backend.api.dto.request.AttributeRequest;
import com.hoangthh.backend.core.domain.AttributeCore;

import java.util.List;

public interface AttributeProvider {
    public void save(AttributeRequest request);
    public List<AttributeCore> findAll();
}
