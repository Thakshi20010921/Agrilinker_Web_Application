package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.Product;
import com.agrilinker.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/products") // "products"collection name

public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/with-image")
    public ResponseEntity<Product> createProductWithImage(
            @RequestPart("product") Product product,
            @RequestPart("image") MultipartFile imageFile) {

        try {
            String projectDir = System.getProperty("user.dir");

            Path uploadPath = projectDir.endsWith("backend")
                    ? Paths.get(projectDir, "uploads").toAbsolutePath()
                    : Paths.get(projectDir, "backend", "uploads").toAbsolutePath();

            Files.createDirectories(uploadPath);

            String original = imageFile.getOriginalFilename();
            String safeName = (original == null) ? "image" : original.replaceAll("[^a-zA-Z0-9._-]", "_");
            String filename = System.currentTimeMillis() + "_" + safeName;

            Path filePath = uploadPath.resolve(filename);
            Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "/uploads/" + filename;
            product.setProduct_image(imageUrl);

            // ✅ SAVE product in DB and return it
            Product saved = productService.createProduct(product);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Product product = productService.getProductById(id);
        return (product != null) ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    // Get all products for a specific farmer
    @GetMapping("/farmer/{email}")
    public ResponseEntity<List<Product>> getProductsByFarmer(@PathVariable String email) {
        List<Product> products = productService.getProductsByFarmer(email);
        return ResponseEntity.ok(products);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable String id,
            @RequestBody Product product) {

        Product updated = productService.updateProduct(id, product);
        return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

}
