package com.dordox.project.Dto.ErrorDto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;

public class FieldErrorResponse extends ErrorResponse {
  private List<FieldMessageError> filds = new ArrayList<>();

  public FieldErrorResponse(HttpStatus status_code, String message) {
    super(status_code, message);
  }
  public List<FieldMessageError> getFilds() {
    return filds;
  }
  public void addFilds(String field, String message) {
    this.filds.add(new FieldMessageError(field, message));
  }
}
