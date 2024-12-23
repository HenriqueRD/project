package com.dordox.project.Entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.dordox.project.Dto.SellDto.SellRequest;
import com.dordox.project.Entities.Enums.Sells.MethodPaymentSellEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "sells")
public class SellEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) 
  private Long id;
  @Column(name = "method_payment")
  @Enumerated(EnumType.STRING)
  private MethodPaymentSellEnum methodPayment;
  @Column(name = "total_value")
  private Float totalValue;
  private Float discount;
  @ManyToOne
  @JoinColumn(name = "order_id")
  private OrderEntity order;
  @OneToMany(mappedBy = "sell")
  private List<TransactionEntity> transaction = new ArrayList<>();
  @CreationTimestamp
  @Column(name = "created_at")
  private LocalDateTime createdAt;

  public SellEntity() {
  }
  public SellEntity(SellRequest obj) {
    this.methodPayment = MethodPaymentSellEnum.valueOf(obj.getMethod_payment());
    this.discount = obj.getDiscount();
    //ARUMMAR===========================
    this.order = obj.getOrder();
  }
  public Long getId() {
    return id;
  }
  public MethodPaymentSellEnum getMethodPayment() {
    return methodPayment;
  }
  public void setMethodPayment(MethodPaymentSellEnum methodPayment) {
    this.methodPayment = methodPayment;
  }
  public Float getTotalValue() {
    return totalValue;
  }
  public void setTotalValue(Float totalValue) {
    this.totalValue = totalValue;
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
  public LocalDateTime getCreatedAt() {
    return createdAt;
  }
  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
