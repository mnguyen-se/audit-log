package com.example.audit_service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

/**
 * DTO doc du lieu JSON gui tu KafkaProducerService ben project PRM.
 * @JsonIgnoreProperties(ignoreUnknown = true) giup DTO nay khong bi loi
 * neu ben PRM co them field khac ma o day chua khai bao.
 */
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AuditLogMessage {
    private String action;
    private String entity;
    private String detail;
    private String username;
}