package com.fullstack.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.backend.entities.Region;
import com.fullstack.backend.service.RegionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/regions")
@Tag(name = "Region", description = "Operaciones relacionadas con regiones")
public class RegionRestController {
    @Autowired
    private RegionService regionService;

    @Operation(summary = "Obtener Región por ID", description = "Devuelve una región dado su ID")
    @GetMapping("/{id}")
    public ResponseEntity<Region> obtenerPorId(@PathVariable Long id) {
        Region region = regionService.obtenerPorId(id);
        return ResponseEntity.ok(region);
    }

    @Operation(summary = "Listar todas las regiones", description = "Devuelve una lista de todas las regiones")
    @GetMapping
    public ResponseEntity<List<Region>> listarRegiones() {
        List<Region> regiones = regionService.obtenerTodas();
        return ResponseEntity.ok(regiones);
    }

}
