package com.hoangthh.backend.infra.repository.db;

import com.hoangthh.backend.infra.repository.db.entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttributeRepository extends JpaRepository<Attribute, Long> {
}
