package com.dordox.project.Dto.SupplierDto;

public record SupplierResponse(
  Long id,
  String name,
  String cnpj,
  String type
) {
}
