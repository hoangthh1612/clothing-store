package com.hoangthh.backend.infra.repository.service;

import com.hoangthh.backend.api.dto.request.ProductRequest;
import com.hoangthh.backend.api.dto.request.VariantRequest;
import com.hoangthh.backend.core.domain.ProductCore;
import com.hoangthh.backend.core.service.provider.VariantProvider;
import com.hoangthh.backend.infra.repository.VariantRepository;
import com.hoangthh.backend.infra.repository.db.ProductRepository;
import com.hoangthh.backend.infra.repository.db.entity.Product;
import com.hoangthh.backend.infra.repository.db.entity.Variant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VariantProviderImpl implements VariantProvider {
    private final VariantRepository variantRepository;
    private final ProductRepository productRepository;
    @Override
    public void save(VariantRequest request) {

    }
}
