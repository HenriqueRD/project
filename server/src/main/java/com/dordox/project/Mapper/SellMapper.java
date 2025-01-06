package com.dordox.project.Mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dordox.project.Dto.SellDto.SellOnlyResponse;
import com.dordox.project.Dto.SellDto.SellResponse;
import com.dordox.project.Entities.SellEntity;

@Mapper(componentModel = "spring")
public interface SellMapper {

  public List<SellOnlyResponse> toResponseOnly(List<SellEntity> obj);
  public SellOnlyResponse toResponseOnly(SellEntity obj);
  
  public List<SellResponse> toResponse(List<SellEntity> obj);
  public SellResponse toResponse(SellEntity obj);
}
