package com.hoangthh.backend.api.dto.response;

import com.hoangthh.backend.infra.repository.db.enums.UserRole;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserDto {
    private Long id;

    private String username;

    private String email;

    private String password;

    private String fullName;

    private UserRole role;

    private String gender;

    private LocalDateTime created_at;

    private LocalDateTime updated_at;
}
