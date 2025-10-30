package com.fullstack.backend.service;

import java.util.List;

import com.fullstack.backend.entities.Comuna;

public interface ComunaService {
    Comuna buscarPorId(Long id);
    List<Comuna> obtenerTodos();

}
