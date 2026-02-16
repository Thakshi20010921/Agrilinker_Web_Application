package com.agrilinker.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.agrilinker.backend.model.CartItem;
import com.agrilinker.backend.repository.CartRepository;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    public List<CartItem> getCartByUser(String userId) {
        return cartRepository.findByUserId(userId);
    }

    public CartItem addToCart(String userId, CartItem item) {

        Optional<CartItem> existing = cartRepository.findByUserIdAndProductId(userId, item.getProductId());

        if (existing.isPresent()) {
            CartItem cartItem = existing.get();
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            return cartRepository.save(cartItem);
        }

        item.setUserId(userId);
        item.setQuantity(1);
        return cartRepository.save(item);
    }

    public CartItem updateQuantity(String cartItemId, int change) {

        CartItem item = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        int newQty = item.getQuantity() + change;

        // auto remove if qty becomes 0 or less
        if (newQty <= 0) {
            cartRepository.delete(item);
            return null;
        }

        item.setQuantity(newQty);
        return cartRepository.save(item);
    }

    public void removeItem(String cartItemId) {
        cartRepository.deleteById(cartItemId);
    }
}
