package com.business.inventory.service;

import com.business.inventory.model.Empresa;
import com.business.inventory.repository.EmpresaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaService {

    private final EmpresaRepository empresaRepository;

    public EmpresaService(EmpresaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    public List<Empresa> obtenerTodas() {
        return empresaRepository.findAll();
    }

    public Empresa guardar(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public void eliminar(String nit) {
        empresaRepository.deleteById(nit);
    }

    public Empresa obtenerPorNit(String nit) {
        return empresaRepository.findById(nit).orElseThrow(() -> new RuntimeException("Empresa no encontrada"));
    }
}
