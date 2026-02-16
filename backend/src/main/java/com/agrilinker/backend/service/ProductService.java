package com.agrilinker.backend.service;

import com.agrilinker.backend.model.Product;
import java.util.List;

public interface ProductService {

    Product createProduct(Product product);

    List<Product> getAllProducts();

    Product getProductById(String id);

    Product updateProduct(String id, Product product);

    void deleteProduct(String id);

    List<Product> getProductsByFarmer(String farmerEmail);
    //new 
    void reduceProductQuantity(String productId, int quantity);


   
}

