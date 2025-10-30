package com.fullstack.backend.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.fullstack.backend.entities.Producto;
import com.fullstack.backend.service.ProductoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/productos")
@Tag(name = "Producto", description = "Operaciones relacionadas con productos")
public class ProductoRestControllers {

    @Autowired
    private ProductoService productoService;

    @PostMapping
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        Producto nuevoProducto = productoService.crear(producto);
        return ResponseEntity.ok(nuevoProducto);
    }


    @Operation(summary = "Subir imagen de producto", description = "Sube una imagen y devuelve la URL accesible públicamente")
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> subirImagen(@RequestParam("file") MultipartFile file) {
        Map<String, String> response = new HashMap<>();

        try {
            // ruta donde se guardarán las imágenes
            String uploadDir = "src/main/resources/static/uploads/";

            // nombre único para evitar sobreescrituras
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // ruta completa donde se guardará
            Path path = Paths.get(uploadDir + fileName);

            // copia del archivo al destino
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            // URL accesible públicamente
            String imageUrl = "http://localhost:8080/uploads/" + fileName;

            response.put("url", imageUrl);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            response.put("error", "No se pudo subir la imagen");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "Obtener producto por ID", description = "Devuelve un producto dado su ID")
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Long id) {
        Producto producto = productoService.obtenerPorId(id);
        return ResponseEntity.ok(producto);
    }

    @Operation(summary = "Listar todos los productos", description = "Devuelve una lista de todos los productos")
    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        List<Producto> productos = productoService.obtenerTodos();
        return ResponseEntity.ok(productos);
    }

    @Operation(summary = "Eliminar producto", description = "Elimina un producto dado su ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Actualizar producto", description = "Actualiza un producto dado su ID")
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        Producto producto = productoService.actualizar(id, productoActualizado);
        return ResponseEntity.ok(producto);
    }

    @Operation(summary = "Inhabilitar producto", description = "Inhabilita un producto dado su ID")
    @PutMapping("/{id}/inhabilitar")
    public ResponseEntity<Producto> inhabilitarProducto(@PathVariable Long id) {
        Producto producto = productoService.inhabilitarPro(id);
        return ResponseEntity.ok(producto);
    }

    @Operation(summary = "Actualizar stock de producto", description = "Actualiza el stock de un producto dado su ID y la cantidad a agregar o restar")
    @PutMapping("/{id}/stock")
    public ResponseEntity<Producto> actualizarStock(@PathVariable Long id, @RequestParam int cantidad) {
        Producto producto = productoService.actualizarStock(id, cantidad);
        return ResponseEntity.ok(producto);
    }
}
