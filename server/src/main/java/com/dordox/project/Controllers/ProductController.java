package com.dordox.project.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.dordox.project.Dto.ProductDto.ProductResponse;
import com.dordox.project.Entities.ProductEntity;
import com.dordox.project.Services.ProductService;


@Controller
@RequestMapping("/products")
public class ProductController {

  @Autowired
  private ProductService service;

  @GetMapping("")
  public ResponseEntity<List<ProductResponse>> list() {
    List<ProductResponse> products = service.list().stream().map((x) -> (new ProductResponse(x))).toList();
    return new ResponseEntity<>(products, HttpStatus.OK); 
  }

  @PostMapping("")
  public ResponseEntity<ProductResponse> create(@RequestBody ProductEntity obj) {
    ProductResponse product = new ProductResponse(service.create(obj));
    return new ResponseEntity<>(product, HttpStatus.CREATED);	
  }
  
} 
