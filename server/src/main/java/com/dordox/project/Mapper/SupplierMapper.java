package com.dordox.project.Mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dordox.project.Dto.SupplierDto.SupplierResponse;
import com.dordox.project.Entities.SupplierEntity;

@Mapper(componentModel = "spring")
public interface SupplierMapper {

  List<SupplierResponse> toResponse(List<SupplierEntity> obj);
  SupplierResponse toResponse(SupplierEntity obj);
}
