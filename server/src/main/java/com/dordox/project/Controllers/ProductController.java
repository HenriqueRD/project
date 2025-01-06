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

import com.dordox.project.Dto.ProductDto.ProductResponse;
import com.dordox.project.Entities.ProductEntity;
import com.dordox.project.Mapper.ProductMapper;
import com.dordox.project.Services.ProductService;


@Controller
@RequestMapping("/products")
@CrossOrigin("http://localhost:5173")
public class ProductController {

  @Autowired
  private ProductService service;
  @Autowired
  private ProductMapper mapper;

  @GetMapping("/")
  public ResponseEntity<List<ProductResponse>> list() {
    List<ProductResponse> products = mapper.toResponse(service.list());
    return new ResponseEntity<>(products, HttpStatus.OK); 
  }

  @PostMapping("/")
  public ResponseEntity<ProductResponse> create(@RequestBody ProductEntity obj) {
    ProductResponse product = mapper.toResponse(service.create(obj));
    return new ResponseEntity<>(product, HttpStatus.CREATED);	
  }
  
} 
