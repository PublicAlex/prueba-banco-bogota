package com.clientes.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class InicioLogger {

    private static final Logger log = LoggerFactory.getLogger(InicioLogger.class);

    @Value("${app.mensaje}")
    private String mensaje;

    @Value("${spring.application.name}")
    private String nombreApp;

    @Value("${server.port}")
    private String puerto;

    @EventListener(ApplicationReadyEvent.class)
    public void alIniciar() {
        log.info("{} - {} en el puerto {}", mensaje, nombreApp, puerto);
    }
}
