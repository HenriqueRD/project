package com.dordox.project.Dto.TransactionDto;

import java.time.LocalDateTime;

import com.dordox.project.Entities.Enums.Transactions.CategoryTransactionEnum;
import com.dordox.project.Entities.Enums.Transactions.MethodPaymentTransactionEnum;
import com.dordox.project.Entities.Enums.Transactions.TypeTransactionEnum;

public record TransactionResponse(
  Long id,
  Float totalValue,
  MethodPaymentTransactionEnum methodPayment,
  TypeTransactionEnum type,
  CategoryTransactionEnum category,
  LocalDateTime createdAt
) {}
