package com.dordox.project.Dto.SellDto;

import java.time.LocalDateTime;

import com.dordox.project.Dto.OrderDto.OrderNotSellResponse;
import com.dordox.project.Entities.Enums.Transactions.MethodPaymentTransactionEnum;

public record SellResponse(
  Long id,
  MethodPaymentTransactionEnum methodPayment,
  Float totalValue,
  Float discount,
  OrderNotSellResponse order,
  LocalDateTime createdAt
) {
}