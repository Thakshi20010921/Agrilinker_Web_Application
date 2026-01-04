package com.agrilinker.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Get current backend folder dynamically
    String uploadDir = System.getProperty("user.dir") + "/uploads/";

        registry
                .addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadDir);
                //C:/Users/Dell/Downloads/New agri 2/Agrilinker_Web_Application/backend/uploads/---------madhusha
                //file:" + uploadDir-------Dynamicpath
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        // API CORS
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

        // IMAGE CORS (VERY IMPORTANT)
        registry.addMapping("/uploads/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET")
                .allowedHeaders("*");
    }
}
