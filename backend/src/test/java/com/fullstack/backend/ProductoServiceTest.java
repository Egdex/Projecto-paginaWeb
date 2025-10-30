package com.fullstack.backend;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.mockito.Mockito.times;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.fullstack.backend.entities.Producto;
import com.fullstack.backend.repositories.ProductoRepository;
import com.fullstack.backend.service.ProductoServiceImpl;

public class ProductoServiceTest {

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoServiceImpl productoService;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCrearProducto() {
        Producto p = new Producto();
        p.setNombre("Producto de prueba");
        p.setPrecio(100);

        when(productoRepository.save(any(Producto.class))).thenReturn(p);

        Producto creado = productoService.crear(p);

        assertNotNull(creado);
        assertEquals("Producto de prueba", creado.getNombre());
        verify(productoRepository, times(1)).save(any(Producto.class));
    }

    @Test
    void testObtenerProductoPorId() {
        Producto p = new Producto();
        p.setId(1L);
        p.setNombre("Producto de prueba");
        p.setPrecio(100);

        when(productoRepository.findById(1L)).thenReturn(java.util.Optional.of(p));

        Producto encontrado = productoService.obtenerPorId(1L);

        assertEquals(1L, encontrado.getId());
    }

    @Test
    void testEliminarProducto() {
        Long productoId = 1L;

        when(productoRepository.existsById(productoId)).thenReturn(true);
        productoService.eliminar(productoId);
        verify(productoRepository, times(1)).deleteById(productoId);
    }

}
