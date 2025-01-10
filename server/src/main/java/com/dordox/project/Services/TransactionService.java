package com.dordox.project.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import com.dordox.project.Entities.TransactionEntity;
import com.dordox.project.Entities.Enums.Transactions.MethodPaymentTransactionEnum;
import com.dordox.project.Entities.Enums.Transactions.TypeTransactionEnum;
import com.dordox.project.Repositories.TransactionRepository;

@Service
public class TransactionService {
  
  @Autowired
  private TransactionRepository repo;
  
  public List<TransactionEntity> list(MultiValueMap<String, String> params) {
    String date = params.get("date").getFirst();
    List<MethodPaymentTransactionEnum> payment = params.get("payment").stream().map(x -> MethodPaymentTransactionEnum.valueOf(x)).toList();
    List<TypeTransactionEnum> type = params.get("type").stream().map(x -> TypeTransactionEnum.valueOf(x)).toList();
    LocalDateTime startDate = LocalDateTime.parse(date + "T00:00:00");
    return repo.findByCreatedAtBetweenAndTypeInAndMethodPaymentInOrderByCreatedAtDesc(startDate, startDate.plusDays(1), type, payment);
  }
}
