package com.fullstack.backend.service;

import java.util.List;

import com.fullstack.backend.entities.Region;

public interface RegionService {
    List<Region> obtenerTodas();
    Region obtenerPorId(Long id);

}
