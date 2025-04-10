package com.hoangthh.backend.core.service.provider;


import com.hoangthh.backend.core.domain.CategoryCore;

import java.util.List;

public interface CategoryProvider {
    public void save(String categoryName);
    public List<CategoryCore> findALl();
}
