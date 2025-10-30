package com.fullstack.backend.entities;


import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fullstack.backend.enums.Rol;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El RUN no puede estar vacío")
    @Pattern(
    regexp = "^[0-9]{7,8}-[0-9Kk]$",
    message = "El RUN debe tener entre 7 y 8 dígitos, seguido de un guion y un dígito verificador (por ejemplo: 12345678-9)"
    )
    private String run;

    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;

    @NotBlank(message = "Los apellidos no pueden estar vacíos")
    private String apellidos;

    @NotBlank(message = "El email no puede estar vacío")
    @Size(min = 5)
    @Email(message = "El email debe tener un formato válido")
    @Column(unique = true)
    private String email;
    private boolean estado = true;
    
    @NotNull(message = "El rol no puede estar vacío")
    @Enumerated(EnumType.STRING)
    private Rol rol;

    @ManyToOne
    @JoinColumn(name = "comuna_id", nullable = false)
    private Comuna comuna;

    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;
    private String direccion;

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;

    @CreationTimestamp
    private LocalDateTime creacionUsu;
    

    
}