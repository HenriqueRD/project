package com.dordox.project.Errors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.dordox.project.Dto.ErrorDto.ErrorResponse;
import com.dordox.project.Dto.ErrorDto.FieldErrorResponse;
import com.dordox.project.Errors.Exceptions.RecordNotFoundException;

@RestControllerAdvice
public class HandleControllerError {
  
  @ExceptionHandler(RecordNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleRecordNotFoundException(RecordNotFoundException exception) {
    ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND, exception.getMessage());
    return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<FieldErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
    FieldErrorResponse error = new FieldErrorResponse(HttpStatus.BAD_REQUEST, "erro na validação dos campos.");
    for (FieldError x : exception.getBindingResult().getFieldErrors()) {
      error.addFilds(x.getField(), x.getDefaultMessage());
    }
    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }
}
