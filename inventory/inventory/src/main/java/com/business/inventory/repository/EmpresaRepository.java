package com.business.inventory.repository;

import com.business.inventory.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // ✅ Esto es crucial
public interface EmpresaRepository extends JpaRepository<Empresa, String> {
}
