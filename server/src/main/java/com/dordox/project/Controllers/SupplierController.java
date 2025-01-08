package com.dordox.project.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dordox.project.Dto.SupplierDto.SupplierResponse;
import com.dordox.project.Mapper.SupplierMapper;
import com.dordox.project.Services.SupplierService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@Controller
@RequestMapping("/suppliers")
@CrossOrigin("http://localhost:5173")
public class SupplierController {

  @Autowired
  private SupplierService service;
  @Autowired
  private SupplierMapper mapper;

  @GetMapping("/")
  public ResponseEntity<List<SupplierResponse>> list() {
    List<SupplierResponse> suppliers = mapper.toResponse(service.list());
    return new ResponseEntity<>(suppliers, HttpStatus.OK);
  }

  @PostMapping("/")
  public ResponseEntity<SupplierResponse> create(@RequestBody int obj) {
    return new ResponseEntity<>(null, HttpStatus.CREATED);
  }
}
