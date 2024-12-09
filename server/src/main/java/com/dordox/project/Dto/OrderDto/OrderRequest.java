package com.dordox.project.Dto.OrderDto;

import com.dordox.project.Entities.OrderEntity;
import com.dordox.project.Entities.Enums.ServiceOrderEnum;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;


public class OrderRequest {
  @NotNull(message = "O cliente é obrigatório")
  private String client;
  @NotNull(message = "O serviço é obrigatório")
  @Enumerated(EnumType.STRING)
  private ServiceOrderEnum service;

  public OrderRequest() {
  }
  public OrderRequest(OrderEntity obj) {
    this.client = obj.getClient();
    this.service = obj.getService();
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
}