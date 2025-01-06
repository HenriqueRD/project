package com.dordox.project.Mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dordox.project.Dto.ProductDto.ProductResponse;
import com.dordox.project.Entities.ProductEntity;

@Mapper(componentModel = "spring")
public interface ProductMapper {

  List<ProductResponse> toResponse(List<ProductEntity> obj);
  ProductResponse toResponse(ProductEntity obj);
}
