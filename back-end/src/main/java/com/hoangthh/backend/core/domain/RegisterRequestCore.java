package com.hoangthh.backend.core.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequestCore {
    private String username;
    private String password;
    private String email;
    private String role;
}
