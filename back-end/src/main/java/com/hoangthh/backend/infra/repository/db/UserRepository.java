package com.hoangthh.backend.infra.repository.db;

import com.hoangthh.backend.infra.repository.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findByUsername(String username);
}
