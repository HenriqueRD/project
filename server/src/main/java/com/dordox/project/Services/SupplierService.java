package com.dordox.project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dordox.project.Entities.SupplierEntity;
import com.dordox.project.Repositories.SupplierRepository;

@Service
public class SupplierService {
  
  @Autowired
  private SupplierRepository repo;

  public List<SupplierEntity> list() {
    List<SupplierEntity> suppliers = repo.findAll();
    return suppliers;
  }

  @Transactional
  public SupplierEntity create() {
    return null;
  }
}
