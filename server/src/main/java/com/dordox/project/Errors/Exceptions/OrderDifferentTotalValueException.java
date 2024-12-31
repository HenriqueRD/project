package com.dordox.project.Errors.Exceptions;

public class OrderDifferentTotalValueException extends RuntimeException {
  public OrderDifferentTotalValueException(Float valueCorrect, Float valueIncorect, Long id) {
    super("O valor total do [ PEDIDO, #" + id + " ] é diferente do esperado. Esperado: R$" + valueCorrect + ", Recebido: R$" + valueIncorect);
  }
}