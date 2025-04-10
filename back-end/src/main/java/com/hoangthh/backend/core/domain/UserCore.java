package com.hoangthh.backend.core.domain;

import com.hoangthh.backend.infra.repository.db.entity.Cart;
import com.hoangthh.backend.infra.repository.db.entity.Order;
import com.hoangthh.backend.infra.repository.db.enums.UserRole;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class UserCore {
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
