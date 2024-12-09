package com.dordox.project.Dto.ItemDto;

import com.dordox.project.Entities.ProductEntity;

import jakarta.validation.constraints.NotNull;

public class ItemRequest {
  @NotNull(message = "o amount é obrigatório")
  private Integer amount;
  @NotNull(message = "o description é obrigatório")
  private String description;
  @NotNull(message = "o product é obrigatório")
  private ProductEntity product;

  public ItemRequest() {
  }
  public Integer getAmount() {
    return amount;
  }
  public void setAmount(Integer amount) {
    this.amount = amount;
  }
  public String getDescription() {
    return description;
  }
  public void setDescription(String description) {
    this.description = description;
  }
  public ProductEntity getProduct() {
    return product;
  }
  public void setProduct(ProductEntity product) {
    this.product = product;
  }

  
}
