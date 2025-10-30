package com.fullstack.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.backend.entities.Region;
import com.fullstack.backend.repositories.RegionRepository;

@Service
public class RegionServiceImpl implements RegionService {

    @Autowired
    private RegionRepository regionRepository;

    @Override
    public List<Region> obtenerTodas() {
        return regionRepository.findAll();
    }

    @Override
    public Region obtenerPorId(Long id) {
        return regionRepository.findById(id).orElseThrow(() -> new RuntimeException("Region no encontrada"));
    }


}
