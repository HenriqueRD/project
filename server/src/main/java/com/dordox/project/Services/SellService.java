package com.dordox.project.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dordox.project.Dto.SellDto.SellRequest;
import com.dordox.project.Entities.OrderEntity;
import com.dordox.project.Entities.SellEntity;
import com.dordox.project.Entities.Enums.Orders.PaymentOrderEnum;
import com.dordox.project.Errors.Exceptions.OrderAlreadyPaidException;
import com.dordox.project.Errors.Exceptions.OrderDifferentTotalValueException;
import com.dordox.project.Errors.Exceptions.RecordNotFoundException;
import com.dordox.project.Repositories.OrderRepository;
import com.dordox.project.Repositories.SellRepository;

@Service
public class SellService {
  
  @Autowired
  private SellRepository repo;
  @Autowired
  private OrderRepository repoOrder;

  public List<SellEntity> list() {
    List<SellEntity> sells = repo.findAll();
    return sells;
  }

  @Transactional
  public SellEntity create(SellRequest obj, Long orderId) {
    Optional<OrderEntity> isOrder = repoOrder.findById(orderId);
    if (isOrder.isPresent()) {
      OrderEntity order = isOrder.get();
      if (order.getStatusPayment() == PaymentOrderEnum.EM_ABERTO) {
        Float totalValue = repoOrder.getSumOrderItems(orderId);
        if (totalValue.equals(obj.getTotal_value())) {
          SellEntity sell = new SellEntity(obj); 
          sell.setOrder(order);
          sell.setTotalValue(totalValue);
          sell.setTotalValue(totalValue - sell.getDiscount());
          order.setStatusPayment(PaymentOrderEnum.PAGO);
          repoOrder.save(order);
          repo.save(sell);
          return sell;
        }
        throw new OrderDifferentTotalValueException(totalValue, obj.getTotal_value(), orderId);
      }
      throw new OrderAlreadyPaidException(orderId);
    }
    throw new RecordNotFoundException("pedido", orderId);
  }
}
