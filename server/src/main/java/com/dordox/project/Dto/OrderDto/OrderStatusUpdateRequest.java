package com.dordox.project.Dto.OrderDto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class OrderStatusUpdateRequest {
	
	@NotNull(message = "O orderStatus do pedido é obrigatório.")
	@Pattern(regexp = "CONCLUIDO|EM_PREPARACAO", message = "o orderStatus deve ser 'CONCLUIDO' ou 'EM_PREPARACAO'")
  private String orderStatus;
  
  public OrderStatusUpdateRequest() {
  }
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
}
