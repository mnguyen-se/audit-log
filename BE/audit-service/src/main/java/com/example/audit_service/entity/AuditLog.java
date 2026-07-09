package com.example.audit_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String action;      // vd: LOGIN_SUCCESS

    @Column(nullable = false)
    private String entity;      // vd: AUTH_LOGIN

    @Column(length = 2000)
    private String detail;      // mo ta them (neu co)

    private String username;    // ai thuc hien hanh dong

    @Column(nullable = false)
    private Instant receivedAt; // thoi diem consumer nhan duoc message

    @PrePersist
    public void prePersist() {
        if (receivedAt == null) {
            receivedAt = Instant.now();
        }
    }
}