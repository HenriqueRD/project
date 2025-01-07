package com.dordox.project.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.dordox.project.Entities.ProductEntity;
import com.dordox.project.Entities.SupplierEntity;
import com.dordox.project.Repositories.ProductRepository;
import com.dordox.project.Repositories.SupplierRepository;

@Component
public class DataLoader implements CommandLineRunner {

  @Autowired
  private ProductRepository repoProduct;
  @Autowired
  private SupplierRepository repoSupplier;

  @Override
  public void run(String... args) throws Exception {
    if(repoProduct.count() == 0 && repoSupplier.count() == 0) { 
      repoProduct.save(new ProductEntity("Prato feito", 20.f, "Comida"));
      repoProduct.save(new ProductEntity("Meio prato feito", 13.f, "Comida"));
      repoProduct.save(new ProductEntity("Cachorro", 18.f, "Comida"));
      repoProduct.save(new ProductEntity("Cachorro duplo", 19.f, "Comida"));
      repoProduct.save(new ProductEntity("Cachorro bife", 21.f, "Comida"));
      repoProduct.save(new ProductEntity("Cachorro frango", 21.f, "Comida"));
      repoProduct.save(new ProductEntity("Cachorro strogonoff", 23.f, "Comida"));
      repoProduct.save(new ProductEntity("Meio cachorro", 11.f, "Comida"));
      repoProduct.save(new ProductEntity("Meio cachorro duplo", 12.f, "Comida"));
      repoProduct.save(new ProductEntity("Meio cachorro bife", 13.f, "Comida"));
      repoProduct.save(new ProductEntity("Xis salada", 23.f, "Comida"));
      repoProduct.save(new ProductEntity("Xis frango", 27.f, "Comida"));
      repoProduct.save(new ProductEntity("Xis bacon", 27.f, "Comida"));
      repoProduct.save(new ProductEntity("Xis calabresa", 27.f, "Comida"));
      repoProduct.save(new ProductEntity("Xis coração", 29.f, "Comida"));
      repoProduct.save(new ProductEntity("Xis tudo", 34.f, "Comida"));
      repoProduct.save(new ProductEntity("Batata media", 15.f, "Comida"));
      repoProduct.save(new ProductEntity("Batata grande", 21.f, "Comida"));
      repoProduct.save(new ProductEntity("Pastel", 9.f, "Comida"));

      repoSupplier.save(new SupplierEntity("Fruteira Flavio", "00.623.904/0001-73", "mercado"));
      repoSupplier.save(new SupplierEntity("Coca-Cola FEMSA", "65.321.984/0001-21", "distribuidora"));
    }
  }
}