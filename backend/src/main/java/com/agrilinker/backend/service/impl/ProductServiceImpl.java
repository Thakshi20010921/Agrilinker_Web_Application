package com.agrilinker.backend.service.impl;

import com.agrilinker.backend.model.Product;
import com.agrilinker.backend.repository.ProductRepository;
import com.agrilinker.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product createProduct(Product product) {
        // Auto-generate Product_id and dateAdded
        product.setProduct_id("P" + System.currentTimeMillis());
        product.setDateAdded(LocalDateTime.now());
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(String id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    @Override
    public Product updateProduct(String id, Product updatedProduct) {
        Product existingProduct = getProductById(id);
        if (existingProduct != null) {
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setCategory(updatedProduct.getCategory());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setQuantity(updatedProduct.getQuantity());
            existingProduct.setUnit(updatedProduct.getUnit());
            existingProduct.setFarmerId(updatedProduct.getFarmerId());
            existingProduct.setLocation(updatedProduct.getLocation());
            existingProduct.setProduct_image(updatedProduct.getProduct_image());
            existingProduct.setStatus(updatedProduct.getStatus());
            return productRepository.save(existingProduct);
        }
        return null;
    }

    @Override
    public void deleteProduct(String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
        } else {
            throw new RuntimeException("Product not found with id: " + id);
        }
    }
}