package com.dordox.project.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "expenses")
@PrimaryKeyJoinColumn(name = "id")
public class ExpenseEntity extends TransactionEntity {
  @ManyToOne
  @JoinColumn(name = "supplier_id")
  private SupplierEntity supplier;

  public ExpenseEntity() {
  }
  public SupplierEntity getSupplier() {
    return supplier;
  }
  public void setSupplier(SupplierEntity supplier) {
    this.supplier = supplier;
  }
}
