package com.dordox.project.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.dordox.project.Entities.ProductEntity;
import com.dordox.project.Repositories.ProductRepository;

@Component
public class DataLoader implements CommandLineRunner {

  @Autowired
  private ProductRepository repo;

  @Override
  public void run(String... args) throws Exception {
    if(repo.count() == 0) { 
      repo.save(new ProductEntity("Prato feito", 20.f, "Comida"));
      repo.save(new ProductEntity("Meio prato feito", 13.f, "Comida"));
      repo.save(new ProductEntity("Cachorro", 18.f, "Comida"));
      repo.save(new ProductEntity("Cachorro duplo", 19.f, "Comida"));
      repo.save(new ProductEntity("Cachorro bife", 21.f, "Comida"));
      repo.save(new ProductEntity("Cachorro frango", 21.f, "Comida"));
      repo.save(new ProductEntity("Cachorro strogonoff", 23.f, "Comida"));
      repo.save(new ProductEntity("Meio cachorro", 11.f, "Comida"));
      repo.save(new ProductEntity("Meio cachorro duplo", 12.f, "Comida"));
      repo.save(new ProductEntity("Meio cachorro bife", 13.f, "Comida"));
      repo.save(new ProductEntity("Xis salada", 23.f, "Comida"));
      repo.save(new ProductEntity("Xis frango", 27.f, "Comida"));
      repo.save(new ProductEntity("Xis bacon", 27.f, "Comida"));
      repo.save(new ProductEntity("Xis calabresa", 27.f, "Comida"));
      repo.save(new ProductEntity("Xis coração", 29.f, "Comida"));
      repo.save(new ProductEntity("Xis tudo", 34.f, "Comida"));
      repo.save(new ProductEntity("Batata media", 15.f, "Comida"));
      repo.save(new ProductEntity("Batata grande", 21.f, "Comida"));
      repo.save(new ProductEntity("Pastel", 9.f, "Comida"));    
    }
  }
}