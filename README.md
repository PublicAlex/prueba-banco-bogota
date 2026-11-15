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

Cada entorno tiene su propio archivo `application-{entorno}.properties`:

| Entorno | Rama    | Nombre app        | Puerto | Mensaje en el log     |
|---------|---------|-------------------|--------|-----------------------|
| dev     | dev     | customers-dev     | 8080   | Ejecutando en DEV     |
| staging | staging | customers-staging | 8083   | Ejecutando en STAGING |
| prod    | main    | customers-prod    | 9090   | Ejecutando en PROD    |

Swagger esta disponible en dev y staging en `/swagger-ui.html`.

## Construir

```bash
./mvnw clean package
```

Genera `target/app.jar`.

## Ejecutar

Dev:

```bash
java -jar target/app.jar --spring.profiles.active=dev
```

Prod:

```bash
java -jar target/app.jar --spring.profiles.active=prod
```

## Docker

```bash
docker build -t customers .
docker run -p 9090:9090 -e SPRING_PROFILES_ACTIVE=prod customers
```

## Despliegue

El workflow `.github/workflows/deploy.yml` se ejecuta con cada push a `dev`, `staging` o `main`:

1. Compila y corre los tests.
2. Construye la imagen Docker y la sube a GitHub Container Registry con el tag del entorno.
3. En el servidor (runner self-hosted) baja la imagen y levanta el contenedor `customers-{entorno}` en su puerto.
4. Solo en staging: corre una prueba de estres con k6 (`estres/carga.js`, 20 usuarios durante 1 minuto) y muestra el promedio de CPU y RAM en el resumen del workflow. Los resultados tambien quedan en el servidor en `~/estres/{fecha}/`.

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
