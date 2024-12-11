package com.dordox.project.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dordox.project.Entities.SellEntity;

@Repository
public interface SellRepository extends JpaRepository<SellEntity, Long>{
  
}
