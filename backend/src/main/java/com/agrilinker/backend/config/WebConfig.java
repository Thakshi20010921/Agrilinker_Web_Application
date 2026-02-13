package com.agrilinker.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

/*@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

         String uploadDir = Paths
                .get(System.getProperty("user.dir"), "backend", "uploads")
                .toAbsolutePath()
                .toUri()
                .toString();

        registry
                .addResourceHandler("/uploads/**")
                .addResourceLocations(uploadDir);
                
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

        registry.addMapping("/uploads/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET");
    }
}*/
@Configuration
public class WebConfig implements WebMvcConfigurer {
        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
                String projectDir = System.getProperty("user.dir");

                String uploadPath = projectDir.endsWith("backend")
                                ? Paths.get(projectDir, "uploads").toString()
                                : Paths.get(projectDir, "backend", "uploads").toString();

                String uploadDir = Paths.get(uploadPath).toAbsolutePath().toUri().toString();

                registry.addResourceHandler("/uploads/**")
                                .addResourceLocations(uploadDir);
        }

        @Override
        public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                                .allowedOrigins("http://localhost:3000")
                                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                                .allowedHeaders("*")
                                .allowCredentials(true);

                registry.addMapping("/uploads/**")
                                .allowedOrigins("http://localhost:3000")
                                .allowedMethods("GET");
        }
}