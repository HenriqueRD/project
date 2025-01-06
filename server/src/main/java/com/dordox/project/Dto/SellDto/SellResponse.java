package com.dordox.project.Dto.SellDto;

import java.time.LocalDateTime;

import com.dordox.project.Dto.OrderDto.OrderNotSellResponse;
import com.dordox.project.Entities.Enums.Sells.MethodPaymentSellEnum;

public record SellResponse(
  Long id,
  MethodPaymentSellEnum methodPayment,
  Float totalValue,
  Float discount,
  OrderNotSellResponse order,
  LocalDateTime createdAt
) {
}