package com.fullstack.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fullstack.backend.entities.Region;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {

}
