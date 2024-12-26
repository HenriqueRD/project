package com.dordox.project.Repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dordox.project.Entities.TransactionEntity;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long>{
    public List<TransactionEntity> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

}
