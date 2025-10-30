package com.fullstack.backend.service;

import java.util.List;


import com.fullstack.backend.entities.Categoria;


public interface CategoriaService {
    Categoria crear(Categoria categoria);
    Categoria obtenerPorId(Long id);
    List<Categoria> obtenerTodos();
    Categoria actualizar(Long id, Categoria categoria);
    void eliminar(Long id);

}
