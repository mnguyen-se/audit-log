package com.example.audit_service.service;

import com.example.audit_service.dto.AuditLogMessage;

public interface AuditLogConsumerService {
    public void consume(AuditLogMessage message);
}
