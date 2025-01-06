package com.dordox.project.Dto.SellDto;

import java.time.LocalDateTime;

import com.dordox.project.Entities.Enums.Sells.MethodPaymentSellEnum;

public record SellOnlyResponse(
  Long id,
  MethodPaymentSellEnum methodPayment,
  Float totalValue,
  Float discount,
  LocalDateTime createdAt
) {
}