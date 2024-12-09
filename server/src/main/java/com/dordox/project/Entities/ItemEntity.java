package com.dordox.project.Entities;

import com.dordox.project.Dto.ItemDto.ItemRequest;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "items")
public class ItemEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Integer amount;
  private String description;
  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  private OrderEntity order;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", nullable = false)
  private ProductEntity product;
 
  public ItemEntity() {
  }
  public ItemEntity(ItemRequest obj) {
    amount = obj.getAmount();
    description = obj.getDescription();
    product = obj.getProduct();
  }
  public ItemEntity(Integer amount, String description) {
    this.amount = amount;
    this.description = description;
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
  public OrderEntity getOrder() {
    return order;
  }
  public void setOrder(OrderEntity order) {
    this.order = order;
  }
  public ProductEntity getProduct() {
    return product;
  }
  public void setProduct(ProductEntity product) {
    this.product = product;
  }
}