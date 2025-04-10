package com.hoangthh.backend.api.dto.request;

import com.hoangthh.backend.infra.repository.db.enums.UserRole;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String role;
}
