package com.dordox.project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dordox.project.Entities.ProductEntity;
import com.dordox.project.Repositories.ProductRepository;

@Service
public class ProductService {
  
  @Autowired
  private ProductRepository repo;

  @Transactional
  public List<ProductEntity> list() {
    List<ProductEntity> products = repo.findAll();
    return products;
  }

  @Transactional
  public ProductEntity create(ProductEntity obj) {
    ProductEntity product = repo.save(obj);
    return product;
  }
}
