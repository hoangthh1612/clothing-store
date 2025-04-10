package com.hoangthh.backend.api.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductRequest {
    private BasicInfo basicInfo;
    private SaleInfo saleInfo;


}
