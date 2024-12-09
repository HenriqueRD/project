package com.dordox.project.Dto.ErrorDto;

import org.springframework.http.HttpStatus;

public class ErrorResponse {
  private HttpStatus status_code;
  private String message;

  public ErrorResponse(HttpStatus status_code, String message) {
    this.status_code = status_code;
    this.message = message;
  }
  public HttpStatus getStatus_code() {
    return status_code;
  }
  public void setStatus_code(HttpStatus status_code) {
    this.status_code = status_code;
  }
  public String getMessage() {
    return message;
  }
  public void setMessage(String message) {
    this.message = message;
  }
}
