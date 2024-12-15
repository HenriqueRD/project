package com.dordox.project.Dto.OrderDto;

import java.time.LocalDateTime;
import java.util.List;

import com.dordox.project.Dto.ItemDto.ItemResponse;
import com.dordox.project.Dto.SellDto.SellResponse;
import com.dordox.project.Entities.OrderEntity;
import com.dordox.project.Entities.Enums.PaymentOrderEnum;
import com.dordox.project.Entities.Enums.ServiceOrderEnum;
import com.dordox.project.Entities.Enums.StatusOrderEnum;


public class OrderResponse {
  private Long id;
  private String client;
  private ServiceOrderEnum service;
  private StatusOrderEnum status_order;
  private PaymentOrderEnum status_payment;
  private Float total_value;
  private List<ItemResponse> items;
  private List<SellResponse> sell;
  private LocalDateTime created_at;
  private LocalDateTime updated_at;

  public OrderResponse() {
  }
  public OrderResponse(OrderEntity obj) {
    this.id = obj.getId();
    this.client = obj.getClient();
    this.service = obj.getService();
    this.status_order = obj.getStatusOrder();
    this.status_payment = obj.getStatusPayment();
    this.total_value = obj.getTotalValue();
    this.items = obj.getItems() != null ? obj.getItems().stream().map(x -> new ItemResponse(x)).toList() : null;
    this.sell = obj.getSell() != null ? obj.getSell().stream().map(x -> new SellResponse(x)).toList() : null;
    this.created_at = obj.getCreatedAt();
    this.updated_at =  obj.getUpdatedAt();
  }
  public Long getId() {
    return id;
  }
  public String getClient() {
    return client;
  }
  public void setClient(String client) {
    this.client = client;
  }
  public ServiceOrderEnum getService() {
    return service;
  }
  public void setService(ServiceOrderEnum service) {
    this.service = service;
  }
  public StatusOrderEnum getStatus_order() {
    return status_order;
  }
  public void setStatus_order(StatusOrderEnum status_order) {
    this.status_order = status_order;
  }
  public PaymentOrderEnum getStatus_payment() {
    return status_payment;
  }
  public void setStatus_payment(PaymentOrderEnum status_payment) {
    this.status_payment = status_payment;
  }
  public Float getTotal_value() {
    return total_value;
  }
  public void setTotal_value(Float total_value) {
    this.total_value = total_value;
  }
  public List<ItemResponse> getItems() {
    return items;
  }
  public void setItems(List<ItemResponse> items) {
    this.items = items;
  }
  public LocalDateTime getCreated_at() {
    return created_at;
  }
  public void setCreated_at(LocalDateTime created_at) {
    this.created_at = created_at;
  }
  public LocalDateTime getUpdated_at() {
    return updated_at;
  }
  public void setUpdated_at(LocalDateTime updated_at) {
    this.updated_at = updated_at;
  }
  public List<SellResponse> getSell() {
    return sell;
  }
  public void setSell(List<SellResponse> sell) {
    this.sell = sell;
  }
}
