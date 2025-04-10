package com.hoangthh.backend.core.service.cms;

import com.hoangthh.backend.api.dto.request.ProductRequest;
import com.hoangthh.backend.api.dto.request.VariantRequest;
import com.hoangthh.backend.core.domain.ProductCore;
import com.hoangthh.backend.core.service.provider.ProductProvider;
import com.hoangthh.backend.core.service.provider.VariantProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CmsProductService {
    private final ProductProvider productProvider;
    private final VariantProvider variantProvider;
    @Transactional
    public String createProduct(ProductRequest request) {
        // save Product table
        productProvider.save(request);
        return "Product created successfully";
    }
}
