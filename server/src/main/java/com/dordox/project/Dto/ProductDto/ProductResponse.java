package com.dordox.project.Dto.ProductDto;

import com.dordox.project.Entities.ProductEntity;

public class ProductResponse {
  private Long id;
  private String name;
  private Float price;
  private String type;

  public ProductResponse() {
  }
  public ProductResponse(ProductEntity obj) {
    this.id = obj.getId();
    this.name = obj.getName();
    this.price = obj.getPrice();
    this.type = obj.getType();
  }
  public Long getId() {
    return id;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public Float getPrice() {
    return price;
  }
  public void setPrice(Float price) {
    this.price = price;
  }
  public String getType() {
    return type;
  }
  public void setType(String type) {
    this.type = type;
  }

  
}
