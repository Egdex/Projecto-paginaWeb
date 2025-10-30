package com.fullstack.backend.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fullstack.backend.entities.Usuario;

@Repository
public interface UsuarioRepository  extends CrudRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);


}
