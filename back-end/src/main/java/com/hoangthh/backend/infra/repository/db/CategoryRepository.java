package com.hoangthh.backend.infra.repository.db;

import com.hoangthh.backend.infra.repository.db.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    public Category findByCategoryName(String name);
}
