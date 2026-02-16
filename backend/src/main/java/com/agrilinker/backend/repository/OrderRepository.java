package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    // Custom query method to find an order by its order number
    Optional<Order> findByOrderNumber(String orderNumber);

    List<Order> findByCustomerEmail(String email);

    //farmer 
    @Query("{ 'items.farmerEmail': ?0 }")
    List<Order> findByFarmerEmail(String email);

    // to get farmerrrr email that oder is completed 
    @Query("{ 'items.farmerEmail': ?0, 'status': 'COMPLETED' }")
    List<Order> findCompletedOrdersByFarmerEmail(String email);
    
   


}
