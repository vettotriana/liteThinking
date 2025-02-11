package com.business.inventory.controller;

import com.business.inventory.model.Categoria;
import com.business.inventory.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias") // <-- Ruta base para categorías
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    // ✅ Método para agregar una nueva categoría
    @PostMapping("/crear")
    public Categoria agregarCategoria(@RequestBody Categoria categoria) {
        return categoriaService.crearCategoria(categoria);
    }

    // ✅ Método para obtener todas las categorías
    @GetMapping("/todas")
    public List<Categoria> obtenerTodasLasCategorias() {
        return categoriaService.obtenerTodasLasCategorias();
    }
}
