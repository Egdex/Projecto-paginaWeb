package com.fullstack.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.backend.entities.Producto;
import com.fullstack.backend.repositories.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public Producto crear(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Producto obtenerPorId(Long id) {
        return productoRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Override
    public List<Producto> obtenerTodos() {
        return (List<Producto>) productoRepository.findAll();
    }

    @Override
    public void eliminar(Long id){
        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("Producto no encontrado");
        }
        productoRepository.deleteById(id);
    }

    @Override
    public Producto actualizar(Long id, Producto producto){
        Producto existeProducto = obtenerPorId(id);
        existeProducto.setNombre(producto.getNombre());
        existeProducto.setDescripcion(producto.getDescripcion());
        existeProducto.setPrecio(producto.getPrecio());
        existeProducto.setStock(producto.getStock());
        existeProducto.setEstado(producto.isEstado());
        existeProducto.setCategoria(producto.getCategoria());
        existeProducto.setImagen(producto.getImagen());
        return productoRepository.save(existeProducto);

    }

    @Override
    public Producto inhabilitarPro(Long id) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        producto.setEstado(false);
        return productoRepository.save(producto);
    }

    @Override
    public Producto actualizarStock(Long id, int cantidad) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (cantidad < 0) {
            throw new RuntimeException("La cantidad no puede ser negativa");
        }

        producto.setStock(cantidad);
        return productoRepository.save(producto);
    }




}
