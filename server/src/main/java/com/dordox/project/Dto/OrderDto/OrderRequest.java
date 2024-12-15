package com.dordox.project.Dto.OrderDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;


public class OrderRequest {
  @NotNull(message = "O cliente é obrigatório")
  private String client;
  @Pattern(regexp = "LEVAR|LOCAL", message = "o service deve ser LEVAR | LOCAL")
  @NotBlank(message = "o service não pode estar vazio")
  private String service;

  public OrderRequest() {
  }
  public String getClient() {
    return client;
  }
  public void setClient(String client) {
    this.client = client;
  }
  public String getService() {
    return service;
  }
  public void setService(String service) {
    this.service = service;
  }
}