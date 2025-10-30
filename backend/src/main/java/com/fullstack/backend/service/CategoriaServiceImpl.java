package com.fullstack.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.backend.entities.Categoria;
import com.fullstack.backend.repositories.CategoriaRepository;

@Service
public class CategoriaServiceImpl implements CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Override
    public Categoria crear(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public Categoria obtenerPorId(Long id) {
        return categoriaRepository.findById(id).orElseThrow(() -> new RuntimeException("Categoria no encontrada"));
    }

    @Override
    public List<Categoria> obtenerTodos() {
        return (List<Categoria>) categoriaRepository.findAll();
    }

    @Override
    public void eliminar(Long id){
        if (!categoriaRepository.existsById(id)) {
            throw new RuntimeException("Categoria no encontrada");
        }
        categoriaRepository.deleteById(id);
    }

    @Override
    public Categoria actualizar(Long id, Categoria cat){
        Categoria existecat = obtenerPorId(id);
        existecat.setNombre(cat.getNombre());
        return categoriaRepository.save(existecat);
        
    }
    

}
