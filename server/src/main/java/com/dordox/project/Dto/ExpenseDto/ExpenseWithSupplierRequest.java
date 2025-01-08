package com.dordox.project.Dto.ExpenseDto;

import com.dordox.project.Entities.Enums.Sells.MethodPaymentSellEnum;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class ExpenseWithSupplierRequest {
  @NotNull(message = "o methodPayment é obrigatório")
  @Pattern(regexp = "DEBITO|PIX|DINHEIRO|CREDITO", message = "o methodPayment deve ser DEBITO | PIX | DINHEIRO | CREDITO")
  @NotBlank(message = "o methodPayment não pode estar vazio")
  private String methodPayment;
  @NotNull(message = "o totalValue é obrigatório")
  private Float totalValue;
  @NotNull(message = "o supplierId é obrigatório")
  private Long supplierId;
  
  public MethodPaymentSellEnum getMethodPayment() {
    return MethodPaymentSellEnum.valueOf(methodPayment);
  }
  public void setMethodPayment(String methodPayment) {
    this.methodPayment = methodPayment;
  }
  public Float getTotalValue() {
    return totalValue;
  }
  public void setTotalValue(Float totalValue) {
    this.totalValue = totalValue;
  }
  public Long getSupplierId() {
    return supplierId;
  }
  public void setSupplierId(Long supplierId) {
    this.supplierId = supplierId;
  }
}
