package com.fullstack.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.backend.entities.Comuna;
import com.fullstack.backend.service.ComunaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/comunas")
@Tag(name = "Comuna", description = "Operaciones relacionadas con comunas")
public class ComunaRestController {
    @Autowired
    private ComunaService comunaService;

    @Operation(summary = "Obtener comuna por ID", description = "Devuelve una comuna dado su ID")
    @GetMapping("/{id}")
    public ResponseEntity<Comuna> obtenerComunaPorId(@PathVariable Long id) {
        Comuna comuna = comunaService.buscarPorId(id);
        return ResponseEntity.ok(comuna);
    }

    @Operation(summary = "Listar todas las comunas", description = "Devuelve una lista de todas las comunas")
    @GetMapping
    public ResponseEntity<List<Comuna>> listarComunas() {
        List<Comuna> comunas = comunaService.obtenerTodos();
        return ResponseEntity.ok(comunas);
    }

}
