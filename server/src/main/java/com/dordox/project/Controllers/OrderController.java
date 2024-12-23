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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.dordox.project.Dto.OrderDto.CreateOrderWithItemsRequest;
import com.dordox.project.Dto.OrderDto.OrderRequest;
import com.dordox.project.Dto.OrderDto.OrderResponse;
import com.dordox.project.Dto.OrderDto.OrderStatusUpdateRequest;
import com.dordox.project.Entities.ItemEntity;
import com.dordox.project.Entities.OrderEntity;
import com.dordox.project.Entities.Enums.Orders.ServiceOrderEnum;
import com.dordox.project.Entities.Enums.Orders.StatusOrderEnum;
import com.dordox.project.Services.OrderService;

import jakarta.validation.Valid;


@Controller
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

  @Autowired
  private OrderService service;

  @GetMapping("/")
  public ResponseEntity<Object> list(@RequestParam MultiValueMap<String, String> params) {
    List<OrderResponse> orders = service.list(params).stream().map(x -> new OrderResponse(x)).toList();
    
    return new ResponseEntity<>(orders, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> find(@PathVariable Long id) {
    OrderResponse order = new OrderResponse(service.find(id));

    return new ResponseEntity<>(order, HttpStatus.OK);	
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> update(@PathVariable Long id, @Valid @RequestBody OrderRequest obj)  {
    OrderEntity order = new OrderEntity(obj.getClient(), ServiceOrderEnum.valueOf(obj.getService()));
    OrderResponse data = new OrderResponse(service.update(id, order));

    return new ResponseEntity<>(data, HttpStatus.OK);	
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Object> updateStatusOrder(@PathVariable Long id, @Valid @RequestBody OrderStatusUpdateRequest obj)  {
    OrderResponse order = new OrderResponse(service.updateStatusOrder(id, StatusOrderEnum.valueOf(obj.getOrder_status())));

    return new ResponseEntity<>(order, HttpStatus.OK);	
  }

  @PatchMapping("{id}/finished")
  public ResponseEntity<Object> finishedOrder(@PathVariable Long id)  {
    OrderResponse order = new OrderResponse(service.finishedOrder(id));

    return new ResponseEntity<>(order, HttpStatus.OK);	
  }

  @PostMapping("/")
  public ResponseEntity<Object> create(@Valid @RequestBody CreateOrderWithItemsRequest obj)  {
    List<ItemEntity> items = obj.getItems().stream().map((x) -> (new ItemEntity(x))).toList();
    OrderEntity order = new OrderEntity(obj.getClient(), ServiceOrderEnum.valueOf(obj.getService()));
    OrderResponse data = new OrderResponse(service.create(order, items));

    return new ResponseEntity<>(data, HttpStatus.CREATED);	
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    service.delete(id);

    return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
  }
} 
