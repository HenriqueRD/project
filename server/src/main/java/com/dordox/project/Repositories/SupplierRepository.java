package com.dordox.project.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dordox.project.Entities.SupplierEntity;

@Repository
public interface SupplierRepository extends JpaRepository<SupplierEntity, Long>{
  
}
