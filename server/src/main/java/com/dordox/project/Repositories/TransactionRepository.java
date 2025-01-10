package com.dordox.project.Repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dordox.project.Entities.TransactionEntity;
import com.dordox.project.Entities.Enums.Transactions.MethodPaymentTransactionEnum;
import com.dordox.project.Entities.Enums.Transactions.TypeTransactionEnum;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long>{
    public List<TransactionEntity> findByCreatedAtBetweenAndTypeInAndMethodPaymentInOrderByCreatedAtDesc(LocalDateTime start, LocalDateTime end,  List<TypeTransactionEnum> type, List<MethodPaymentTransactionEnum> methodPayment);

}
