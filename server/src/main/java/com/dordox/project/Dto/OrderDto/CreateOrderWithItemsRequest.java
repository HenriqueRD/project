package com.dordox.project.Dto.OrderDto;

import java.util.List;

import com.dordox.project.Dto.ItemDto.ItemRequest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class CreateOrderWithItemsRequest {
  @NotNull(message = "o client é obrigatório")
  private String client;
  @NotNull(message = "o service é obrigatório")
  @Pattern(regexp = "LEVAR|LOCAL", message = "o service deve ser LEVAR | LOCAL")
  @NotBlank(message = "o service não pode estar vazio")
  private String service;
  @NotNull(message = "o items é obrigatório.")
  @Size(min = 1, message = "deve haver pelo menos um item")
  @Valid
  private List<ItemRequest> items;

  public CreateOrderWithItemsRequest() {
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
  public List<ItemRequest> getItems() {
      return items;
  }
  public void setItems(List<ItemRequest> items) {
      this.items = items;
  }
}
