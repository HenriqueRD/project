package com.dordox.project.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dordox.project.Dto.ExpenseDto.ExpenseWithSupplierRequest;
import com.dordox.project.Dto.ExpenseDto.ExpenseResponse;
import com.dordox.project.Mapper.ExpenseMapper;
import com.dordox.project.Services.ExpenseService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@Controller
@RequestMapping("/expenses")
@CrossOrigin("http://localhost:5173")
public class ExpenseController {

  @Autowired
  private ExpenseService service;
  @Autowired
  private ExpenseMapper mapper;

  @GetMapping("/")
  public ResponseEntity<List<ExpenseResponse>> list() {
    List<ExpenseResponse> expenses = mapper.toResponse(service.list());
    return new ResponseEntity<>(expenses, HttpStatus.OK);
  }

  @PostMapping("/")
  public ResponseEntity<ExpenseResponse> createWithSupplier(@Valid @RequestBody ExpenseWithSupplierRequest obj) {
    ExpenseResponse expense = mapper.toResponse(service.createWithSupplier(obj));
    return new ResponseEntity<>(expense, HttpStatus.CREATED);
  }
}
