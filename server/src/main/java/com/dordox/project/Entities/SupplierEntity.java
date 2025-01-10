package com.dordox.project.Entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.dordox.project.Entities.Enums.Suppliers.TypeSuppliersEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "suppliers")
public class SupplierEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) 
  private Long id;
  private String name;
  private String cnpj;
  private String phone;
  @Enumerated(EnumType.STRING)
  private TypeSuppliersEnum type;
  @CreationTimestamp
  @Column(name = "created_at")
  private LocalDateTime createdAt;
  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;
  
  @OneToMany
  private List<ExpenseEntity> expenses = new ArrayList<>();
 
  public SupplierEntity() {
  }
  public SupplierEntity(String name, String cnpj, TypeSuppliersEnum type, String phone) {
    this.name = name;
    this.cnpj = cnpj;
    this.type = type;
    this.phone = phone;
  }
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getCnpj() {
    return cnpj;
  }
  public void setCnpj(String cnpj) {
    this.cnpj = cnpj;
  }
  public TypeSuppliersEnum getType() {
    return type;
  }
  public void setType(TypeSuppliersEnum type) {
    this.type = type;
  }
  public List<ExpenseEntity> getExpenses() {
    return expenses;
  }
  public void setExpenses(List<ExpenseEntity> expenses) {
    this.expenses = expenses;
  }
  public String getPhone() {
    return phone;
  }
  public void setPhone(String phone) {
    this.phone = phone;
  }
  public LocalDateTime getCreatedAt() {
    return createdAt;
  }
  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }
  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}