package com.dordox.project.Repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dordox.project.Entities.OrderEntity;
import com.dordox.project.Entities.Enums.Orders.StatusOrderEnum;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long>{
  
  //@Query(value = "SELECT * FROM orders o WHERE o.status_order IN (:status)", nativeQuery = true)
  public List<OrderEntity> findByStatusOrderInAndCreatedAtBetween(List<StatusOrderEnum> status, LocalDateTime start, LocalDateTime end);

  @Query(value = "SELECT COALESCE(SUM(p.price * i.amount), 0) FROM orders o INNER JOIN items i ON o.id = i.order_id INNER JOIN products p ON p.id = i.product_id WHERE o.id = ?1", nativeQuery = true)
  public Float getSumOrderItems(Long id);

}
