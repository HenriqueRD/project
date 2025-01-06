package com.dordox.project.Entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
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
  private String type;
  @OneToMany
  private List<ExpenseEntity> expenses = new ArrayList<>();
 
  public SupplierEntity() {
  }
  public SupplierEntity(Long id, String name, String cnpj, String type) {
    this.id = id;
    this.name = name;
    this.cnpj = cnpj;
    this.type = type;
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
  public String getType() {
    return type;
  }
  public void setType(String type) {
    this.type = type;
  }
  public List<ExpenseEntity> getExpenses() {
    return expenses;
  }
  public void setExpenses(List<ExpenseEntity> expenses) {
    this.expenses = expenses;
  }
}