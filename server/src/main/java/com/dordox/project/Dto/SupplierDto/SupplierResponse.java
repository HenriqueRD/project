package com.dordox.project.Dto.SupplierDto;

import java.time.LocalDateTime;

public record SupplierResponse(
  Long id,
  String name,
  String cnpj,
  String type,
  String phone,
  LocalDateTime createdAt,
  LocalDateTime updatedAt
) {
}
