package com.fullstack.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.backend.entities.Categoria;
import com.fullstack.backend.service.CategoriaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/categorias")
@Tag(name = "Categoria", description = "Operaciones relacionadas con categorías")
public class CategoriaRestController {

    @Autowired
    private CategoriaService categoriaService;

    @Operation(summary = "Crear categoría", description = "Crea una nueva categoría")
    @PostMapping
    public ResponseEntity<Categoria> crearCategoria(@RequestBody Categoria categoria) {
        Categoria nuevaCategoria = categoriaService.crear(categoria);
        return ResponseEntity.ok(nuevaCategoria);
    }

    @Operation(summary = "Obtener categoría por ID", description = "Devuelve una categoría dado su ID")
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerCategoriaPorId(@PathVariable Long id) {
        Categoria categoria = categoriaService.obtenerPorId(id);
        return ResponseEntity.ok(categoria);
    }

    @Operation(summary = "Listar todas las categorías", description = "Devuelve una lista de todas las categorías")
    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategorias() {
        List<Categoria> categorias = categoriaService.obtenerTodos();
        return ResponseEntity.ok(categorias);
    }

    @Operation(summary = "Eliminar categoría", description = "Elimina una categoría dado su ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        categoriaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Actualizar categoría", description = "Actualiza una categoría dado su ID")
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Long id, @RequestBody Categoria categoriaActualizada) {
        Categoria categoria = categoriaService.actualizar(id, categoriaActualizada);
        return ResponseEntity.ok(categoria);
    }

}