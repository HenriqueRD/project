package com.dordox.project.Errors.Exceptions;

public class OrderAlreadyPaidException extends RuntimeException {
  public OrderAlreadyPaidException(Long id) {
    super("[ PEDIDO, #" + id + " ] já foi pago");
  }
}