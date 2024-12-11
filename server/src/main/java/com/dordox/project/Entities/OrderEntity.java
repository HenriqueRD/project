package com.dordox.project.Entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.dordox.project.Dto.OrderDto.OrderRequest;
import com.dordox.project.Entities.Enums.PaymentOrderEnum;
import com.dordox.project.Entities.Enums.ServiceOrderEnum;
import com.dordox.project.Entities.Enums.StatusOrderEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class OrderEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) 
  private Long id;
  private String client;
  @Enumerated(EnumType.STRING)
  private ServiceOrderEnum service;
  @Column(name = "status_order")
  @Enumerated(EnumType.STRING)
  private StatusOrderEnum statusOrder;
  @Column(name = "status_payment")
  @Enumerated(EnumType.STRING)
  private PaymentOrderEnum statusPayment;
  @Column(name = "total_value")
  private Float totalValue;
  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<ItemEntity> items = new ArrayList<>();
  @OneToMany(mappedBy = "order")
  private List<SellEntity> sell = new ArrayList<>();
  @CreationTimestamp
  @Column(name = "created_at")
  private LocalDateTime createdAt;
  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  public OrderEntity() {
  }
  public OrderEntity(OrderRequest obj) {
    this.client = obj.getClient();
    this.service = obj.getService();
  }
  public OrderEntity(String client, ServiceOrderEnum service) {
    this.client = client;
    this.service = service;
  }
  public String getClient() {
    return client;
  }
  public void setClient(String client) {
    this.client = client;
  }
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public ServiceOrderEnum getService() {
    return service;
  }
  public void setService(ServiceOrderEnum service) {
    this.service = service;
  }
  public StatusOrderEnum getStatusOrder() {
    return statusOrder;
  }
  public void setStatusOrder(StatusOrderEnum statusOrder) {
    this.statusOrder = statusOrder;
  }
  public PaymentOrderEnum getStatusPayment() {
    return statusPayment;
  }
  public void setStatusPayment(PaymentOrderEnum statusPayment) {
    this.statusPayment = statusPayment;
  }
  public Float getTotalValue() {
    return totalValue;
  }
  public void setTotalValue(Float totalValue) {
    this.totalValue = totalValue;
  }
  public List<ItemEntity> getItems() {
    return items;
  }
  public void setItems(List<ItemEntity> items) {
    this.items = items;
  }
  public List<SellEntity> getSell() {
    return sell;
  }
  public LocalDateTime getCreatedAt() {
    return createdAt;
  }
  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
  public LocalDateTime getUpdated_at() {
    return updatedAt;
  }
  public void setUpdated_at(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}