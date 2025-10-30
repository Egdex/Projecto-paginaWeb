package com.fullstack.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
//import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;
import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.*;

import com.fullstack.backend.entities.Usuario;
import com.fullstack.backend.repositories.UsuarioRepository;
import com.fullstack.backend.service.UsuarioServiceImpl;

public class UsuarioServiceTest {

    //@Mock
    //private PasswordEncoder passwordEncoder;

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioServiceImpl usuarioService;
    
    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    

    @Test
    void testCrearUsuario() {
        Usuario user = new Usuario();
        user.setRun("12345678-9");
        user.setNombre("Juan");
        user.setApellidos("Perez");
        user.setEmail("juan.perez@example.com");
        user.setPassword("password123");

        when (usuarioRepository.save(any(Usuario.class))).thenReturn(user);


        Usuario creado = usuarioService.crear(user);

        assertNotNull(creado);
        assertEquals("Juan", creado.getNombre());
        assertEquals("Perez", creado.getApellidos());
        assertEquals("juan.perez@example.com", creado.getEmail());


        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    void testObtenerPorId() {
        Usuario user = new Usuario();
        user.setId(1L);
        user.setNombre("Juan");

        when(usuarioRepository.findById(1L)).thenReturn(java.util.Optional.of(user));

        Usuario encontrado = usuarioService.obtenerPorId(1L);
        assertNotNull(encontrado);
        assertEquals("Juan", encontrado.getNombre());

        verify(usuarioRepository, times(1)).findById(1L);
    }

    @Test
    void testActualizarUsuario() {
        Usuario existente = new Usuario();
        existente.setId(1L);
        existente.setNombre("Juan");

        Usuario nuevo = new Usuario();
        nuevo.setNombre("Carlos");

        when(usuarioRepository.findById(1L)).thenReturn(java.util.Optional.of(existente));
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(nuevo);

        Usuario actualizado = usuarioService.actualizar(1L, nuevo);

        assertEquals("Carlos", actualizado.getNombre());
    }
}
