package com.example.audit_service.controller;

import com.example.audit_service.entity.AuditLog;
import com.example.audit_service.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuditLogController {

    private final AuditLogRepository auditLogRepository;

    // GET /api/audit-logs?page=0&size=20&search=login
    @GetMapping("/api/audit-logs")
    public Page<AuditLog> getLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "") String search
    ) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "receivedAt"));

        if (search == null || search.isBlank()) {
            return auditLogRepository.findAll(pageable);
        }
        return auditLogRepository
                .findByActionContainingIgnoreCaseOrEntityContainingIgnoreCaseOrUsernameContainingIgnoreCase(
                        search, search, search, pageable);
    }
}