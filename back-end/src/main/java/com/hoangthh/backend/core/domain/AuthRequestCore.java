package com.hoangthh.backend.core.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthRequestCore {
    private String username;
    private String password;
}
