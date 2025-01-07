package com.dordox.project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dordox.project.Entities.ExpenseEntity;
import com.dordox.project.Repositories.ExpenseRepository;

@Service
public class ExpenseService {
  
  @Autowired
  private ExpenseRepository repo;

  public List<ExpenseEntity> list() {
    List<ExpenseEntity> expenses = repo.findAll();
    return expenses;
  }

  @Transactional
  public ExpenseEntity create() {
    return null;
  }
}
