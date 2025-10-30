package com.fullstack.backend.service;

import java.util.List;

import com.fullstack.backend.entities.Usuario;

public interface UsuarioService {
    Usuario crear(Usuario user);
    Usuario obtenerPorId(Long id);
    List<Usuario> obtenerTodos();
    void eliminar(Long id);
    Usuario actualizar(Long id, Usuario user);
    Usuario inhabilitar(Long id);


}
