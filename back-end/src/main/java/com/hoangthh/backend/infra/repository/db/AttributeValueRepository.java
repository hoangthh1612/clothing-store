package com.hoangthh.backend.infra.repository.db;

import com.hoangthh.backend.infra.repository.db.entity.AttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttributeValueRepository extends JpaRepository<AttributeValue, Long> {
}
