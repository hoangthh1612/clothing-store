package com.hoangthh.backend.api.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RefreshRequest {
    private final String refreshToken;
}
