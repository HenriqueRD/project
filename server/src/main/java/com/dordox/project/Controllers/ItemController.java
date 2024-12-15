package com.dordox.project.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.dordox.project.Dto.ItemDto.ItemRequest;
import com.dordox.project.Entities.ItemEntity;
import com.dordox.project.Services.ItemService;

import jakarta.validation.Valid;


@Controller
@RequestMapping("/items")
@CrossOrigin("http://localhost:5173")
public class ItemController {

  @Autowired
  private ItemService service;

  @PostMapping("/order/{orderId}")
  public ResponseEntity<Void> create(@PathVariable Long orderId, @Valid @RequestBody ItemRequest obj) {
    service.create(orderId, new ItemEntity(obj));
    return new ResponseEntity<>(null, HttpStatus.CREATED);	
  }
  
  @DeleteMapping("/{id}/order/{orderId}")
  public ResponseEntity<Void> delete(@PathVariable Long orderId, @PathVariable Long id) {
    service.delete(orderId, id);
    return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);	
  }
} 
