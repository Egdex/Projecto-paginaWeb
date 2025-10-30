package com.fullstack.backend.controllers;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.backend.entities.Usuario;
import com.fullstack.backend.enums.Rol;
import com.fullstack.backend.repositories.UsuarioRepository;
import com.fullstack.backend.service.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.fullstack.backend.dto.LoginResquest;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/usuarios")
@Tag(name = "Usuario", description = "Operaciones relacionadas con usuarios")
public class UsuarioRestController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    //@Autowired
    //private PasswordEncoder passwordEncoder;

    @Operation(summary = "Crear usuario", description = "Crea un nuevo usuario")
    @PostMapping
    public ResponseEntity<?> crearUsuario(@Valid @RequestBody Usuario usuario, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errores);
        }
        usuario.setEstado(true);
        //usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        Usuario nuevoUsuario = usuarioService.crear(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    @Operation(summary = "Iniciar sesión", description = "Inicia sesión de un usuario")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginResquest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
            .orElse(null);

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Usuario no encontrado");
        }

        // Verifica la contraseña
        if (!usuario.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Contraseña incorrecta");
        }

        // Validar rol de administrador
        if (usuario.getRol() != Rol.ADMIN) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body("Acceso denegado: se requiere rol ADMIN");
        }


        // Devuelve los datos del usuario autenticado (sin contraseña)
        usuario.setPassword(null);
        return ResponseEntity.ok(usuario);
    }


    @Operation(summary = "Obtener usuario por ID", description = "Devuelve un usuario dado su ID")
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.obtenerPorId(id);
        return ResponseEntity.ok(usuario);
    }

    @Operation(summary = "Listar todos los usuarios", description = "Devuelve una lista de todos los usuarios")
    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.obtenerTodos();
        return ResponseEntity.ok(usuarios);
    }

    @Operation(summary = "Eliminar usuario", description = "Elimina un usuario dado su ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

   @Operation(summary = "Actualizar usuario", description = "Actualiza un usuario dado su ID")
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        Usuario usuario = usuarioService.actualizar(id, usuarioActualizado);
        return ResponseEntity.ok(usuario);
    }

    @Operation(summary = "Inhabilitar usuario", description = "Inhabilita un usuario dado su ID")
    @PutMapping("/{id}/inhabilitar")
    public ResponseEntity<Usuario> inhabilitarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioService.inhabilitar(id);
        return ResponseEntity.ok(usuario);
    }

    

}

