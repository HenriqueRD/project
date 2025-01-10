package com.dordox.project.Dto.SellDto;

import java.time.LocalDateTime;

import com.dordox.project.Entities.Enums.Transactions.MethodPaymentTransactionEnum;

public record SellOnlyResponse(
  Long id,
  MethodPaymentTransactionEnum methodPayment,
  Float totalValue,
  Float discount,
  LocalDateTime createdAt
) {
}