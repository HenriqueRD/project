package com.dordox.project.Mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dordox.project.Dto.TransactionDto.TransactionResponse;
import com.dordox.project.Entities.TransactionEntity;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

  List<TransactionResponse> toResponse(List<TransactionEntity> obj);
}
