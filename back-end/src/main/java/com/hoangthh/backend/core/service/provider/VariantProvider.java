package com.hoangthh.backend.core.service.provider;


import com.hoangthh.backend.api.dto.request.ProductRequest;
import com.hoangthh.backend.api.dto.request.VariantRequest;

public interface VariantProvider {
    public void save(VariantRequest request);
}
