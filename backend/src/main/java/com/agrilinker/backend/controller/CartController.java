package com.agrilinker.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import com.agrilinker.backend.model.CartItem;
import com.agrilinker.backend.service.CartService;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;

    // STEP 1: Load cart
    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable String userId) {
        return cartService.getCartByUser(userId);
    }

    // STEP 2: Add to cart
    @PostMapping("/{userId}")
    public CartItem addToCart(
            @PathVariable String userId,
            @RequestBody CartItem item) {
        return cartService.addToCart(userId, item);
    }

    // STEP 3: Update quantity
    @PutMapping("/{cartItemId}")
    public CartItem updateQuantity(
            @PathVariable String cartItemId,
            @RequestParam int qty) {
        return cartService.updateQuantity(cartItemId, qty);
    }

    // Remove
    @DeleteMapping("/{cartItemId}")
    public void remove(@PathVariable String cartItemId) {
        cartService.removeItem(cartItemId);
    }
}
