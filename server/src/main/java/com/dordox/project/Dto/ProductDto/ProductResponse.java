package com.dordox.project.Dto.ProductDto;

public record ProductResponse(
  Long id,
  String name,
  Float price,
  String type
) {
}
