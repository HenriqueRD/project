package com.dordox.project.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.dordox.project.Dto.SellDto.SellRequest;
import com.dordox.project.Dto.SellDto.SellResponse;
import com.dordox.project.Entities.SellEntity;
import com.dordox.project.Services.SellService;

import jakarta.validation.Valid;


@Controller
@RequestMapping("/sells")
@CrossOrigin("http://localhost:5173")
public class SellController {

  @Autowired
  private SellService service;

  @GetMapping("/")
  public ResponseEntity<List<SellResponse>> list() {
    List<SellResponse> sells = service.list().stream().map((x) -> (new SellResponse(x))).toList();
    return new ResponseEntity<>(sells, HttpStatus.OK); 
  }

  @PostMapping("/")
  public ResponseEntity<SellResponse> create(@Valid @RequestBody SellRequest obj) {
    SellResponse sell = new SellResponse(service.create(new SellEntity(obj)));
    return new ResponseEntity<>(sell, HttpStatus.CREATED);	
  }
  
} 