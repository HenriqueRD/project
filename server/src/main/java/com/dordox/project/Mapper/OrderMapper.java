package com.dordox.project.Mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dordox.project.Dto.OrderDto.OrderNotSellResponse;
import com.dordox.project.Dto.OrderDto.OrderResponse;
import com.dordox.project.Entities.OrderEntity;

@Mapper(componentModel = "spring")
public interface OrderMapper {

  public List<OrderNotSellResponse> toResponseNotSell(List<OrderEntity> obj);
  public OrderNotSellResponse toResponseNotSell(OrderEntity obj);
  
  public List<OrderResponse> toResponse(List<OrderEntity> obj);
  public OrderResponse toResponse(OrderEntity obj);
}
