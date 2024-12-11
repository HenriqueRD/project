package com.dordox.project.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dordox.project.Entities.ItemEntity;
import com.dordox.project.Entities.OrderEntity;
import com.dordox.project.Errors.Exceptions.RecordNotFoundException;
import com.dordox.project.Repositories.ItemRepository;
import com.dordox.project.Repositories.OrderRepository;

@Service
public class ItemService {
  
  @Autowired
  private ItemRepository repo;
  @Autowired
  private OrderRepository repoOrder;
  
  //check order paid

  @Transactional
  public void create(Long id, ItemEntity obj) {
     Optional<OrderEntity> isOrder = repoOrder.findById(id);
    if (isOrder.isPresent()) {
      obj.setOrder(isOrder.get());
      repo.save(obj);
    } 
    else {
      throw new RecordNotFoundException("pedido", id);
    }
  }

  @Transactional
  public void delete(Long id) {
    boolean isItem = repo.findById(id).isPresent();
    if(isItem) {
      repo.deleteById(id);
    } 
    else {
      throw new RecordNotFoundException("item", id);
    }
  }
}
