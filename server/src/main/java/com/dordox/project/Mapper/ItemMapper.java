package com.dordox.project.Mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dordox.project.Dto.ItemDto.ItemResponse;
import com.dordox.project.Entities.ItemEntity;

@Mapper(componentModel = "spring")
public interface ItemMapper {

  List<ItemResponse> toResponse(List<ItemEntity> obj);
  ItemResponse toResponse(ItemEntity obj);
}
