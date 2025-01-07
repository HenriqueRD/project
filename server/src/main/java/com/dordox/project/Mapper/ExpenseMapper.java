package com.dordox.project.Mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dordox.project.Dto.ExpenseDto.ExpenseResponse;
import com.dordox.project.Entities.ExpenseEntity;

@Mapper(componentModel = "spring")
public interface ExpenseMapper {

  List<ExpenseResponse> toResponse(List<ExpenseEntity> obj);
  ExpenseResponse toResponse(ExpenseEntity obj);
}
