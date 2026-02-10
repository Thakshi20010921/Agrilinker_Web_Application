package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    // Custom query method to find an order by its order number
    Optional<Order> findByOrderNumber(String orderNumber);

    List<Order> findByCustomerEmail(String email);
}
