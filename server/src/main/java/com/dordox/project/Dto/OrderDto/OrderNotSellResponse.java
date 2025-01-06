package com.dordox.project.Dto.OrderDto;

import java.time.LocalDateTime;
import java.util.List;

import com.dordox.project.Dto.ItemDto.ItemResponse;
import com.dordox.project.Entities.Enums.Orders.PaymentOrderEnum;
import com.dordox.project.Entities.Enums.Orders.ServiceOrderEnum;
import com.dordox.project.Entities.Enums.Orders.StatusOrderEnum;


public record OrderNotSellResponse(
  Long id,
  String client,
  ServiceOrderEnum service,
  StatusOrderEnum statusOrder,
  PaymentOrderEnum statusPayment,
  Float totalValue,
  List<ItemResponse> items,
  LocalDateTime createdAt,
  LocalDateTime updatedAt
) {
}