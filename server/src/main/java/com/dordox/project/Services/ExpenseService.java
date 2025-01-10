package com.dordox.project.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dordox.project.Dto.ExpenseDto.ExpenseWithSupplierRequest;
import com.dordox.project.Entities.ExpenseEntity;
import com.dordox.project.Entities.SupplierEntity;
import com.dordox.project.Entities.Enums.Transactions.CategoryTransactionEnum;
import com.dordox.project.Errors.Exceptions.RecordNotFoundException;
import com.dordox.project.Repositories.ExpenseRepository;
import com.dordox.project.Repositories.SupplierRepository;

@Service
public class ExpenseService {
  
  @Autowired
  private ExpenseRepository repo;
  @Autowired
  private SupplierRepository repoSupplier;

  public List<ExpenseEntity> list() {
    List<ExpenseEntity> expenses = repo.findAll();
    return expenses;
  }

  @Transactional
  public ExpenseEntity createWithSupplier(ExpenseWithSupplierRequest dto) {
    Optional<SupplierEntity> isSupplier = repoSupplier.findById(dto.getSupplierId());
    if (isSupplier.isPresent()) {
      ExpenseEntity expense = new ExpenseEntity(isSupplier.get(), CategoryTransactionEnum.COMPRA_PRODUTOS, dto.getMethodPayment());
      expense.setTotalValue(dto.getTotalValue());
      repo.save(expense);
      return expense;
    }
    throw new RecordNotFoundException("supplier", dto.getSupplierId());
  }
}
