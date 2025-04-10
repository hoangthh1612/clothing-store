package com.hoangthh.backend.infra.repository.db;

import com.hoangthh.backend.infra.repository.db.entity.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    //@EntityGraph(attributePaths = {"variants"})
//    @Query("select Product(p.id, p.name, p.description, p.imageUrl)" +
//            " from Product p")
//    List<Product> findAllProducts();

}
