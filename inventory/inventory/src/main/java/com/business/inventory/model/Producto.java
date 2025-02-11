package com.business.inventory.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String descripcion;

    private double precio;

    // Relación Many-to-Many con Categoría
    @ManyToMany
    @JoinTable(name = "producto_categoria", joinColumns = @JoinColumn(name = "producto_id"), inverseJoinColumns = @JoinColumn(name = "categoria_id"))
    private Set<Categoria> categorias = new HashSet<>(); // Evitar NullPointerException

    @ManyToOne
    @JoinColumn(name = "empresa_nit", referencedColumnName = "nit", nullable = false)
    private Empresa empresa;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public Set<Categoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(Set<Categoria> categorias) {
        this.categorias = categorias;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    // Métodos para agregar y eliminar categorías
    public void agregarCategoria(Categoria categoria) {
        this.categorias.add(categoria);
        categoria.getProductos().add(this); // Mantener la relación bidireccional
    }

    public void eliminarCategoria(Categoria categoria) {
        this.categorias.remove(categoria);
        categoria.getProductos().remove(this); // Mantener la relación bidireccional
    }
}
