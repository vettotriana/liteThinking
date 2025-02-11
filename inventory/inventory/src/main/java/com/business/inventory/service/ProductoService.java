package com.business.inventory.service;

import com.business.inventory.model.Producto;
import com.business.inventory.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    // Obtener todos los productos
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    // Obtener productos por empresa
    public List<Producto> obtenerPorEmpresa(String empresaNit) {
        return productoRepository.findByEmpresaNit(empresaNit);
    }

    // Guardar un nuevo producto
    public Producto guardarProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    // Obtener un producto por ID
    public Optional<Producto> obtenerPorId(Long id) {
        return productoRepository.findById(id);
    }

    // Actualizar un producto existente
    public Producto actualizarProducto(Long id, Producto productoActualizado) {
        return productoRepository.findById(id).map(producto -> {
            producto.setNombre(productoActualizado.getNombre());
            producto.setDescripcion(productoActualizado.getDescripcion());
            producto.setPrecio(productoActualizado.getPrecio());
            producto.setCategorias(productoActualizado.getCategorias());
            producto.setEmpresa(productoActualizado.getEmpresa());
            return productoRepository.save(producto);
        }).orElse(null);
    }

    // Eliminar un producto por ID
    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }

    // Crear un nuevo producto
    public Producto crearProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public Producto obtenerProductoPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));
    }

}
