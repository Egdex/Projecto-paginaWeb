package com.fullstack.backend.service;

import java.util.List;

import com.fullstack.backend.entities.Producto;

public interface ProductoService {
    Producto crear(Producto producto);
    Producto obtenerPorId(Long id);
    List<Producto> obtenerTodos();
    Producto actualizar(Long id, Producto producto);
    void eliminar(Long id);
    Producto inhabilitarPro(Long id);
    Producto actualizarStock(Long id, int cantidad);

}
