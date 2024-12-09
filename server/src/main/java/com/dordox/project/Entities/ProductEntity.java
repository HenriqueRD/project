package com.dordox.project.Entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class ProductEntity {
  @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private Float price;
  private String type;
  @OneToMany(mappedBy = "product")
  private List<ItemEntity> items;
  
  public ProductEntity() {
  }
  public ProductEntity(String name, Float price, String type) {
    this.name = name;
    this.price = price;
    this.type = type;
  }
  public List<ItemEntity> getItems() {
    return items;
  }
  public void setItems(List<ItemEntity> items) {
    this.items = items;
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