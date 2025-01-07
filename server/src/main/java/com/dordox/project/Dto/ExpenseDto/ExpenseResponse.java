package com.dordox.project.Dto.ExpenseDto;

import java.time.LocalDateTime;

import com.dordox.project.Dto.SupplierDto.SupplierResponse;
import com.dordox.project.Entities.Enums.Sells.MethodPaymentSellEnum;

public record ExpenseResponse(
  Long id,
  MethodPaymentSellEnum methodPayment,
  Float totalValue,
  SupplierResponse supplier,
  LocalDateTime createdAt
) {
}
