# prueba-banco-bogota

API para registrar y listar clientes. Hecha con Java 25, Spring Boot 4 y SQLite.

## Dependencias

El proyecto se creo con Spring Initializr (Maven) con estas dependencias:

- Spring Web
- Spring Data JPA
- Validation
- Spring Boot DevTools
- SQLite JDBC (`org.xerial:sqlite-jdbc`)
- Hibernate Community Dialects (dialecto de SQLite para JPA)
- springdoc-openapi (Swagger UI)

## Entornos

Hay tres perfiles: `dev`, `staging` y `prod`. Por defecto arranca en dev.

- dev: puerto 8080
- staging: puerto 8083
- prod: puerto 8082 (se puede cambiar con `PORT` y la base con `DB_URL`)

Swagger esta disponible en dev y staging en `/swagger-ui.html`.

## Endpoints

- `POST /api/clientes` registra un cliente
- `GET /api/clientes` lista los clientes

Ejemplo del body:

```json
{
  "nombre": "Ana",
  "email": "ana@mail.com",
  "telefono": "3001234567"
}
```
