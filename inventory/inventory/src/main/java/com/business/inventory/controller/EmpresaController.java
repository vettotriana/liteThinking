package com.business.inventory.controller;

import com.business.inventory.model.Empresa;
import com.business.inventory.service.EmpresaService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    // ✅ Listar empresas
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EXTERNO')")
    public List<Empresa> listarEmpresas() {
        return empresaService.obtenerTodas();
    }

    // ✅ Crear una nueva empresa
    @PostMapping("/crear")
    @PreAuthorize("hasRole('ADMIN')")
    public Empresa crearEmpresa(@RequestBody Empresa empresa) { // Aceptar JSON en el cuerpo de la solicitud
        return empresaService.guardar(empresa);
    }

    @DeleteMapping("/eliminar/{nit}")
    public ResponseEntity<?> eliminarEmpresa(@PathVariable String nit) {
        try {
            empresaService.eliminar(nit);
            return ResponseEntity.ok("Empresa eliminada con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empresa no encontrada.");
        }
    }

    @PutMapping("/editar/{nit}")
    @PreAuthorize("hasRole('ADMIN')")
    public Empresa editarEmpresa(@PathVariable String nit, @RequestBody Empresa empresaActualizada) {
        Empresa empresaExistente = empresaService.obtenerPorNit(nit);
        empresaExistente.setNombre(empresaActualizada.getNombre());
        empresaExistente.setDireccion(empresaActualizada.getDireccion());
        empresaExistente.setTelefono(empresaActualizada.getTelefono());
        return empresaService.guardar(empresaExistente);
    }

}
