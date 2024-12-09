package com.dordox.project.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dordox.project.Entities.ItemEntity;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity, Long>{
  
}
