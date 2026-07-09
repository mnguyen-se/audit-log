package com.example.audit_service.serviceImpl;

import com.example.audit_service.dto.AuditLogMessage;
import com.example.audit_service.dto.req.AuditLogRequest;
import com.example.audit_service.entity.AuditLog;
import com.example.audit_service.repository.AuditLogRepository;
import com.example.audit_service.service.AuditLogConsumerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuditLogServiceImpl implements AuditLogConsumerService {
    private final AuditLogRepository auditLogRepository;

    @KafkaListener(topics = "${app.kafka.topic}", groupId = "${app.kafka.group-id}")
    public void consume(AuditLogMessage message) {
        log.info("Nhan duoc audit log tu Kafka: {} - {}", message.getAction(), message.getEntity());

        AuditLog entity = AuditLog.builder()
                .action(message.getAction())
                .entity(message.getEntity())
                .detail(message.getDetail())
                .username(message.getUsername())
                .build();

        auditLogRepository.save(entity);
    }

    @Override
    public void createLog(AuditLogRequest auditLogRequest) {
        AuditLog log = AuditLog.builder()
                .action(auditLogRequest.getAction())
                .entity(auditLogRequest.getEntity())
                .entityId(auditLogRequest.getEntityId())
                .detail(auditLogRequest.getDetail())
                .username(auditLogRequest.getUsername())
                .userId(auditLogRequest.getUserId())
                .sourceService(auditLogRequest.getSourceService())
                .build();

        auditLogRepository.save(log);
    }
}
