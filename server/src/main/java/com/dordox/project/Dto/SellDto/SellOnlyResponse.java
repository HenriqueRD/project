package com.dordox.project.Dto.SellDto;

import java.time.LocalDateTime;

import com.dordox.project.Entities.SellEntity;
import com.dordox.project.Entities.Enums.Sells.MethodPaymentSellEnum;

public class SellOnlyResponse {
  private Long id;
  private MethodPaymentSellEnum method_payment;
  private Float total_value;
  private Float discount;
  private LocalDateTime created_at;

  public SellOnlyResponse() {
  }
  public SellOnlyResponse(SellEntity obj) {
    this.id = obj.getId();
    this.method_payment = obj.getMethodPayment();
    this.total_value = obj.getTotalValue();
    this.discount = obj.getDiscount();
    this.created_at = obj.getCreatedAt();
  }
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public MethodPaymentSellEnum getMethod_payment() {
    return method_payment;
  }
  public void setMethod_payment(MethodPaymentSellEnum method_payment) {
    this.method_payment = method_payment;
  }
  public Float getTotal_value() {
    return total_value;
  }
  public void setTotal_value(Float total_value) {
    this.total_value = total_value;
  }
  public Float getDiscount() {
    return discount;
  }
  public void setDiscount(Float discount) {
    this.discount = discount;
  }
  public LocalDateTime getCreated_at() {
    return created_at;
  }
  public void setCreated_at(LocalDateTime created_at) {
    this.created_at = created_at;
  }
}
