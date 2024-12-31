package com.dordox.project.Dto.TransactionDto;

import java.time.LocalDateTime;

import com.dordox.project.Entities.TransactionEntity;
import com.dordox.project.Entities.Enums.Transactions.CategoryTransactionEnum;
import com.dordox.project.Entities.Enums.Transactions.TypeTransactionEnum;

public class TransactionResponse {
  private Long id;
  private Float total_value;
  private TypeTransactionEnum type;
  private CategoryTransactionEnum category;
  private LocalDateTime created_at;

  public TransactionResponse() {
  }

  public TransactionResponse(TransactionEntity obj) {
    this.id = obj.getId();
    this.category = obj.getCategory();
    this.type = obj.getType();
    this.created_at = obj.getCreatedAt();
    this.total_value = obj.getTotalValue();
  }

  public Long getId() {
    return id;
  }
  public Float getTotal_value() {
    return total_value;
  }
  public void setTotal_value(Float totalValue) {
    this.total_value = totalValue;
  }
  public TypeTransactionEnum getType() {
    return type;
  }
  public void setType(TypeTransactionEnum type) {
    this.type = type;
  }
  public CategoryTransactionEnum getCategory() {
    return category;
  }
  public void setCategory(CategoryTransactionEnum category) {
    this.category = category;
  }
  public LocalDateTime getCreated_at() {
    return created_at;
  }
  public void setCreated_at(LocalDateTime created_at) {
    this.created_at = created_at;
  }
}
