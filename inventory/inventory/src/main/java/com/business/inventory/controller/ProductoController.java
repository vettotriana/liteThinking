package com.business.inventory.controller;

import com.business.inventory.repository.EmpresaRepository;
import com.business.inventory.model.Categoria;
import com.business.inventory.model.Empresa;
import com.business.inventory.model.Producto;
import com.business.inventory.service.CategoriaService;
import com.business.inventory.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;
    private EmpresaRepository empresaRepository;
    private CategoriaService categoriaService;

    public ProductoController(EmpresaRepository empresaRepository, ProductoService productoService) {
        this.empresaRepository = empresaRepository;
        this.productoService = productoService;
    }

    // ✅ Obtener todos los productos
    @GetMapping
    public List<Producto> obtenerTodos() {
        return productoService.obtenerTodos();
    }

    // ✅ Obtener productos por empresa
    @GetMapping("/empresa/{empresaNit}")
    public List<Producto> obtenerPorEmpresa(@PathVariable String empresaNit) {
        return productoService.obtenerPorEmpresa(empresaNit);
    }

    // ✅ Obtener un producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        Optional<Producto> producto = productoService.obtenerPorId(id);
        return producto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Crear un nuevo producto
    @PostMapping("/crear")
    public Producto crearProducto(@RequestBody Producto producto, @RequestParam String empresaNit) {
        Empresa empresa = empresaRepository.findById(empresaNit)
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));

        // Asignar la empresa al producto
        producto.setEmpresa(empresa);

        // Verificar que se reciban los datos correctos
        System.out.println("Nombre: " + producto.getNombre());
        System.out.println("Descripción: " + producto.getDescripcion());
        System.out.println("Precio: " + producto.getPrecio());

        return productoService.crearProducto(producto);
    }

    // ✅ Actualizar un producto existente
    @PutMapping("/editar/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id,
            @RequestBody Producto productoActualizado) {
        Producto actualizado = productoService.actualizarProducto(id, productoActualizado);
        if (actualizado != null) {
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Eliminar un producto por ID
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{productoId}/categorias")
    public Producto asociarCategoriasAProducto(
            @PathVariable Long productoId,
            @RequestBody List<Long> categoriasIds) {

        Producto producto = productoService.obtenerProductoPorId(productoId);
        List<Categoria> categorias = categoriaService.obtenerTodasLasCategorias()
                .stream()
                .filter(categoria -> categoriasIds.contains(categoria.getId()))
                .toList();

        producto.setCategorias(new HashSet<>(categorias)); // 🚩 Convertir List a Set

        return productoService.guardarProducto(producto);
    }

}
