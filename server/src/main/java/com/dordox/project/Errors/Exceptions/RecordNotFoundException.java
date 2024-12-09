package com.dordox.project.Errors.Exceptions;

public class RecordNotFoundException extends RuntimeException {
  public RecordNotFoundException(String entity_name, Long id) {
    super("Registro [ " + entity_name.toUpperCase()+ ", #" + id + " ] não encontrado.");
  }
}
