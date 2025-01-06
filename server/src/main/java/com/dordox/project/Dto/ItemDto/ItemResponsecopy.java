package com.dordox.project.Dto.ItemDto;

import org.springframework.beans.factory.annotation.Autowired;

import com.dordox.project.Dto.ProductDto.ProductResponse;
import com.dordox.project.Entities.ItemEntity;
import com.dordox.project.Mapper.ProductMapper;

public class ItemResponsecopy {
  private Long id;
  private Integer amount;
  private String description;
  private ProductResponse product;

  @Autowired
  private ProductMapper mapper;

  public ItemResponsecopy() {
  }
  public ItemResponsecopy(ItemEntity obj) {
    this.id = obj.getId();
    this.amount =  obj.getAmount();
    this.description =  obj.getDescription();
    this.product = mapper.toResponse(obj.getProduct());
  }
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
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
  public ProductResponse getProduct() {
    return product;
  }
  public void setProduct(ProductResponse product) {
    this.product = product;
  }

  
}
