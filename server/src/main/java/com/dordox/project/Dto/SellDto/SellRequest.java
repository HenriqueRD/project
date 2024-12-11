package com.dordox.project.Dto.SellDto;

import com.dordox.project.Entities.OrderEntity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class SellRequest {
  @NotNull(message = "o discont é obrigatório")
  private Float discount;
  //ARUMAR ================================
  @NotNull(message = "o order é obrigatório")
  private OrderEntity order;
  //ARUMAR ================================
  @NotNull(message = "o method_payment é obrigatório")
  @Pattern(regexp = "DEBITO|PIX|DINHEIRO|CREDITO", message = "o method_payment deve ser DEBITO | PIX| DINHEIRO | CREDITO")
  @NotBlank(message = "o method_payment não pode estar vazio")
  private String method_payment;

  public SellRequest() {
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
  public String getMethod_payment() {
    return method_payment;
  }
  public void setMethod_payment(String method_payment) {
    this.method_payment = method_payment;
  }
}
