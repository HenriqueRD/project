package com.dordox.project.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.dordox.project.Dto.TransactionDto.TransactionResponse;
import com.dordox.project.Mapper.TransactionMapper;
import com.dordox.project.Services.TransactionService;

import org.springframework.web.bind.annotation.GetMapping;



@Controller
@RequestMapping("/transactions")
@CrossOrigin("http://localhost:5173")
public class TransactionController {

  @Autowired
  private TransactionService service;
  @Autowired
  private TransactionMapper mapper;

  @GetMapping("/")
  public ResponseEntity<List<TransactionResponse>> list(@RequestParam MultiValueMap<String, String> params) {
    List<TransactionResponse> list = mapper.toResponse(service.list(params));
      return new ResponseEntity<>(list, HttpStatus.OK);
  }
  
} 
