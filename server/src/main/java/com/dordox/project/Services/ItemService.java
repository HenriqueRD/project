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
  public void create(Long orderId, ItemEntity obj) {
    Optional<OrderEntity> isOrder = repoOrder.findById(orderId);
    if (isOrder.isPresent()) {
      OrderEntity order = isOrder.get();
      obj.setOrder(order);
      order.setUpdatedAt();
      repoOrder.save(order);
      repo.save(obj);
    } 
    else {
      throw new RecordNotFoundException("pedido", orderId);
    }
  }

  @Transactional
  public void delete(Long orderId, Long id) {
    Optional<OrderEntity> isOrder = repoOrder.findById(orderId);
    if (isOrder.isPresent()) {
      Optional<ItemEntity> isItem = repo.findById(id);
      OrderEntity order = isOrder.get();
      if(isItem.isPresent()) {
        order.setUpdatedAt();
        repoOrder.save(order);
        repo.deleteById(id);
      }
      else {
        throw new RecordNotFoundException("item", id);
      }
    } 
    else {
      throw new RecordNotFoundException("pedido", orderId);
    }
  }
}
