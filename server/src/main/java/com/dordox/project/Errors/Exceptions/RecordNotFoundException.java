package com.dordox.project.Errors.Exceptions;

public class RecordNotFoundException extends RuntimeException {
  public RecordNotFoundException(String entityName, Long id) {
    super("registro [ " + entityName.toUpperCase()+ ", #" + id + " ] não encontrado");
  }
}
