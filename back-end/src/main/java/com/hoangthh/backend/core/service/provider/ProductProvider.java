package com.hoangthh.backend.core.service.provider;


import com.hoangthh.backend.api.dto.request.ProductRequest;
import com.hoangthh.backend.core.domain.ProductCore;

import java.util.List;
import java.util.Optional;

public interface ProductProvider {
    public void save(ProductRequest request);
    public List<ProductCore> findAll();
    public Optional<ProductCore> findById(Long id);
}
