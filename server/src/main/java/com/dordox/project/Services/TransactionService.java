package com.dordox.project.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import com.dordox.project.Entities.SellEntity;
import com.dordox.project.Entities.TransactionEntity;
import com.dordox.project.Entities.Enums.Transactions.CategoryTransactionEnum;
import com.dordox.project.Entities.Enums.Transactions.TypeTransactionEnum;
import com.dordox.project.Repositories.TransactionRepository;

@Service
public class TransactionService {
  
  @Autowired
  private TransactionRepository repo;
  
  public List<TransactionEntity> list(MultiValueMap<String, String> params) {
    String date = params.get("date").getFirst();
    LocalDateTime startDate = LocalDateTime.parse(date + "T00:00:00");
    System.out.println(date);
    return repo.findByCreatedAtBetween(startDate, startDate.plusDays(1));
  }

  public void createInput(SellEntity sell, CategoryTransactionEnum category) {
    TransactionEntity trans = new TransactionEntity();
    trans.setType(TypeTransactionEnum.ENTRADA);
    trans.setCategory(category);
    trans.setTotalValue(sell.getTotalValue() - sell.getDiscount());
    trans.setSell(sell);

    repo.save(trans);
  }
}
