package com.fullstack.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.backend.entities.Comuna;
import com.fullstack.backend.repositories.ComunaRepository;

@Service
public class ComunaServiceImpl implements ComunaService {

    @Autowired
    private ComunaRepository comunaRepository;

    @Override
    public Comuna buscarPorId(Long id) {
        return comunaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comuna no encontrada"));
    }

    @Override
    public List<Comuna> obtenerTodos() {
        return (List<Comuna>) comunaRepository.findAll();
    }

}
