package com.dordox.project.Services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;

import com.dordox.project.Entities.ItemEntity;
import com.dordox.project.Entities.OrderEntity;
import com.dordox.project.Entities.Enums.Orders.PaymentOrderEnum;
import com.dordox.project.Entities.Enums.Orders.StatusOrderEnum;
import com.dordox.project.Errors.Exceptions.PaymentRequiredException;
import com.dordox.project.Errors.Exceptions.RecordNotFoundException;
import com.dordox.project.Repositories.ItemRepository;
import com.dordox.project.Repositories.OrderRepository;

@Service
public class OrderService {
  
  @Autowired
  private OrderRepository repo;
  @Autowired
  private ItemRepository repoItem;

  public List<OrderEntity> list(MultiValueMap<String, String> params) {
    List<StatusOrderEnum> status = params.get("status").stream().map((x) -> StatusOrderEnum.valueOf(x.toString())).toList();
    String date = params.getFirst("date");
    LocalDateTime localDateTime = LocalDateTime.parse(date + "T00:00:00");

    List<OrderEntity> orders = repo.findByStatusOrderInAndCreatedAtBetween(status, localDateTime, localDateTime.plusDays(1));
    return orders;
  }

  public OrderEntity find(Long id) throws RecordNotFoundException {
    Optional<OrderEntity> order = repo.findById(id);
    if(order.isPresent()) {
      return order.get();
    } 
    else {
      throw new RecordNotFoundException("pedido", id);
    }
  }

  public OrderEntity update(Long id, OrderEntity obj) throws RecordNotFoundException {
    Optional<OrderEntity> isOrder = repo.findById(id);
    if(isOrder.isPresent()) {
      OrderEntity order = isOrder.get();
      order.setClient(obj.getClient());
      order.setService(obj.getService());
      float totalValue = repo.getSumOrderItems(order.getId());
      order.setTotalValue(totalValue);
      return repo.save(order);
    } 
    else {
      throw new RecordNotFoundException("pedido", id);
    }
  }

  public OrderEntity updateStatusOrder(Long id, StatusOrderEnum status) throws RecordNotFoundException {
    Optional<OrderEntity> isOrder = repo.findById(id);
    if(isOrder.isPresent()) {
      OrderEntity order = isOrder.get();
      order.setStatusOrder(status);
      return repo.save(order);
    } 
    else {
      throw new RecordNotFoundException("pedido", id);
    }
  }

  public OrderEntity finishedOrder(Long id) throws RecordNotFoundException {
    Optional<OrderEntity> isOrder = repo.findById(id);
    if(isOrder.isPresent()) {
      OrderEntity order = isOrder.get();
      if(order.getStatusPayment() == PaymentOrderEnum.PAGO) {
        order.setStatusOrder(StatusOrderEnum.FINALIZADO);
        return repo.save(order);
      }
      throw new PaymentRequiredException();
    } 
    else {
      throw new RecordNotFoundException("pedido", id);
    }
  }

  @Transactional
  public OrderEntity create(OrderEntity order, List<ItemEntity> items) {
    if(order.getClient().equals("")) {
      order.setClient("não informado");
    }
    order.setStatusOrder(StatusOrderEnum.EM_PREPARACAO);
    order.setStatusPayment(PaymentOrderEnum.EM_ABERTO);
    order.setTotalValue(0.f);
    OrderEntity new_create_order = repo.save(order);
    
    for (ItemEntity x : items) {
      x.setOrder(new_create_order);
      repoItem.save(x);
    }

    OrderEntity order_update = repo.findById(new_create_order.getId()).get();
    float totalValue = repo.getSumOrderItems(order_update.getId());
    order_update.setTotalValue(totalValue);

    return repo.save(order_update);
  }

  public void delete(Long id) throws RecordNotFoundException {
    boolean isOrder = repo.findById(id).isPresent();
    if(isOrder) {
      repo.deleteById(id);
    } 
    else {
      throw new RecordNotFoundException("pedido", id);
    }
  }

}
