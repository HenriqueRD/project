package com.dordox.project.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dordox.project.Entities.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long>{
  
}
