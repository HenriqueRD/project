package com.dordox.project.Errors.Exceptions;

public class PaymentRequiredException extends RuntimeException {
  public PaymentRequiredException() {
    super("o pagamento é necessário para concluir esta operação");
  }
}