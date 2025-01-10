package com.dordox.project.Entities;

import com.dordox.project.Dto.SellDto.SellRequest;
import com.dordox.project.Entities.Enums.Transactions.CategoryTransactionEnum;
import com.dordox.project.Entities.Enums.Transactions.MethodPaymentTransactionEnum;
import com.dordox.project.Entities.Enums.Transactions.TypeTransactionEnum;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "sells")
@PrimaryKeyJoinColumn(name = "id")
public class SellEntity extends TransactionEntity {
  private Float discount;
  @ManyToOne
  @JoinColumn(name = "order_id")
  private OrderEntity order;

  public SellEntity() {
    super();
  }
  public SellEntity(SellRequest obj) {
    super(TypeTransactionEnum.ENTRADA, CategoryTransactionEnum.VENDA_PEDIDO, MethodPaymentTransactionEnum.valueOf(obj.getMethod_payment()));
    this.discount = obj.getDiscount();
  }
  public Float getDiscount() {
    return discount;
  }
  public void setDiscount(Float discount) {
    this.discount = discount;
  }
  public OrderEntity getOrder() {
    return order;
  }
  public void setOrder(OrderEntity order) {
    this.order = order;
  }
}
