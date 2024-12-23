package com.dordox.project.Entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.dordox.project.Entities.Enums.Transactions.CategoryTransactionEnum;
import com.dordox.project.Entities.Enums.Transactions.TypeTransactionEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "transactions")
public class TransactionEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) 
  private Long id;
  @Column(name = "total_value")
  private Float totalValue;
  @Enumerated(EnumType.STRING)
  private TypeTransactionEnum type;
  @Enumerated(EnumType.STRING)
  private CategoryTransactionEnum category;
  @ManyToOne
  @JoinColumn(name = "sell_id")
  private SellEntity sell;
  @CreationTimestamp
  @Column(name = "created_at")
  private LocalDateTime createdAt;

  public TransactionEntity() {
  }

  public Long getId() {
    return id;
  }
  public Float getTotalValue() {
    return totalValue;
  }
  public void setTotalValue(Float totalValue) {
    this.totalValue = totalValue;
  }
  public TypeTransactionEnum getType() {
    return type;
  }
  public void setType(TypeTransactionEnum type) {
    this.type = type;
  }
  public CategoryTransactionEnum getCategory() {
    return category;
  }
  public void setCategory(CategoryTransactionEnum category) {
    this.category = category;
  }
  public SellEntity getSell() {
    return sell;
  }
  public void setSell(SellEntity sell) {
    this.sell = sell;
  }public LocalDateTime getCreatedAt() {
    return createdAt;
  }
  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}