package com.dordox.project.Dto.SellDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class SellRequest {
  @NotNull(message = "o discont é obrigatório")
  private Float discount;
  @NotNull(message = "o method_payment é obrigatório")
  @Pattern(regexp = "DEBITO|PIX|DINHEIRO|CREDITO", message = "o method_payment deve ser DEBITO | PIX | DINHEIRO | CREDITO")
  @NotBlank(message = "o method_payment não pode estar vazio")
  private String method_payment;
  @NotNull(message = "o total_value é obrigatório")
  private Float total_value;

  public SellRequest() {
  }
  public Float getDiscount() {
    return discount;
  }
  public void setDiscount(Float discount) {
    this.discount = discount;
  }
  public String getMethod_payment() {
    return method_payment;
  }
  public void setMethod_payment(String method_payment) {
    this.method_payment = method_payment;
  }
  public float getTotal_value() {
    return total_value;
  }
  public void setTotal_value(float total_value) {
    this.total_value = total_value;
  }
}
