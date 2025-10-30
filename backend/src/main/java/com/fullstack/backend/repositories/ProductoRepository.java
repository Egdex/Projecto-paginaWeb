package com.fullstack.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fullstack.backend.entities.Producto;

@Repository
public interface ProductoRepository extends CrudRepository<Producto, Long> {

}
