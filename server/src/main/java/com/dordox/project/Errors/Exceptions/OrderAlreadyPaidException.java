package com.dordox.project.Errors.Exceptions;

public class OrderAlreadyPaidException extends RuntimeException {
  public OrderAlreadyPaidException() {
    super("pedido já foi pago");
  }
}