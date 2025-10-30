package com.fullstack.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fullstack.backend.entities.Usuario;
import com.fullstack.backend.repositories.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    //@Autowired
    //private PasswordEncoder passwordEncoder;

    @Override
    public Usuario crear(Usuario usuario) {
        usuario.setCreacionUsu(LocalDateTime.now()); // asigna fecha actual
        //usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario obtenerPorId(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public List<Usuario> obtenerTodos() {
        return (List<Usuario>) usuarioRepository.findAll();
    }

    @Override
    public void eliminar(Long id){
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    @Override
    public Usuario actualizar(Long id, Usuario usuario){
        Usuario existeUsuario = obtenerPorId(id);
        existeUsuario.setRun(usuario.getRun());
        existeUsuario.setNombre(usuario.getNombre());
        existeUsuario.setApellidos(usuario.getApellidos());
        existeUsuario.setEmail(usuario.getEmail());
        existeUsuario.setEstado(usuario.isEstado());
        existeUsuario.setRol(usuario.getRol());
        existeUsuario.setComuna(usuario.getComuna());
        existeUsuario.setRegion(usuario.getRegion());
        existeUsuario.setDireccion(usuario.getDireccion());
        existeUsuario.setPassword(usuario.getPassword());
        existeUsuario.setCreacionUsu(usuario.getCreacionUsu());
        return usuarioRepository.save(existeUsuario);

    }

    @Override
    public Usuario inhabilitar(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setEstado(false); 
        return usuarioRepository.save(usuario);
    }


}
