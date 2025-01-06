package com.dordox.project.Dto.ItemDto;

import com.dordox.project.Dto.ProductDto.ProductResponse;

public record ItemResponse(
  Long id,
  Integer amount,
  String description,
  ProductResponse product
) {
}