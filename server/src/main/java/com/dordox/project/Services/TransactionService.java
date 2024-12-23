package com.dordox.project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dordox.project.Entities.SellEntity;
import com.dordox.project.Entities.TransactionEntity;
import com.dordox.project.Entities.Enums.Transactions.CategoryTransactionEnum;
import com.dordox.project.Entities.Enums.Transactions.TypeTransactionEnum;
import com.dordox.project.Repositories.TransactionRepository;

@Service
public class TransactionService {
  
  @Autowired
  private TransactionRepository repo;
  
  public List<TransactionEntity> list() {
    return repo.findAll();
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
