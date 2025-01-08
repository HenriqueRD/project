package com.dordox.project.Entities;

import com.dordox.project.Entities.Enums.Sells.MethodPaymentSellEnum;
import com.dordox.project.Entities.Enums.Transactions.CategoryTransactionEnum;
import com.dordox.project.Entities.Enums.Transactions.TypeTransactionEnum;

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
  public ExpenseEntity(SupplierEntity supplier, CategoryTransactionEnum category, MethodPaymentSellEnum methodPayment) {
    super(TypeTransactionEnum.SAIDA, category, methodPayment);
    this.supplier = supplier;
  }
  public SupplierEntity getSupplier() {
    return supplier;
  }
  public void setSupplier(SupplierEntity supplier) {
    this.supplier = supplier;
  }
}
