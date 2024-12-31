package com.dordox.project.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dordox.project.Entities.OrderEntity;
import com.dordox.project.Entities.SellEntity;
import com.dordox.project.Entities.Enums.Orders.PaymentOrderEnum;
import com.dordox.project.Entities.Enums.Transactions.CategoryTransactionEnum;
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
  @Autowired
  private TransactionService servTransaction;

  public List<SellEntity> list() {
    List<SellEntity> sells = repo.findAll();
    return sells;
  }

  @Transactional
  public SellEntity create(SellEntity obj, Long orderId) {
    Optional<OrderEntity> isOrder = repoOrder.findById(orderId);
    if (isOrder.isPresent()) {
      OrderEntity order = isOrder.get();
      if (order.getStatusPayment() == PaymentOrderEnum.EM_ABERTO) {
        Float totalValue = repoOrder.getSumOrderItems(orderId);
        if (totalValue.equals(obj.getTotalValue())) {
          order.setStatusPayment(PaymentOrderEnum.PAGO);
          repoOrder.save(order);
          obj.setTotalValue(totalValue);
          obj.setOrder(order);
          SellEntity sell = repo.save(obj);
          servTransaction.createInput(sell, CategoryTransactionEnum.VENDA_PEDIDO);
          return sell;
        }
        throw new OrderDifferentTotalValueException(totalValue, obj.getTotalValue(), orderId);
      }
      throw new OrderAlreadyPaidException(orderId);
    }
    throw new RecordNotFoundException("pedido", orderId);
  }
}
