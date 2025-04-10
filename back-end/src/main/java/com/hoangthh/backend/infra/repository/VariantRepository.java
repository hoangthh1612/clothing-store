package com.hoangthh.backend.infra.repository;

import com.hoangthh.backend.infra.repository.db.entity.Variant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VariantRepository extends JpaRepository<Variant, Long> {
}
