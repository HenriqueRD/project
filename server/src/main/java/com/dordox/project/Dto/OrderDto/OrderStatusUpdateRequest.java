package com.dordox.project.Dto.OrderDto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class OrderStatusUpdateRequest {
	
	@NotNull(message = "O status do pedido é obrigatório.")
	@Pattern(regexp = "CONCLUIDO|EM_PREPARACAO", message = "o order_status deve ser 'CONCLUIDO' ou 'EM_PREPARACAO'")
  private String order_status;
  
  public OrderStatusUpdateRequest() {
  }
	public String getOrder_status() {
		return order_status;
	}
	public void setOrder_status(String order_status) {
		this.order_status = order_status;
	}
}
