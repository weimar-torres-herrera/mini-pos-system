# Mini POS System

Un sistema de Punto de Venta (POS) construido con **Angular**, **NestJS** y **Clean Architecture**.

## Arquitectura

El proyecto sigue los principios de **Arquitectura Limpia / Clean Arquitecture**:
- **Domain**: Entidades de negocio y reglas (Product, Sale, Cart).
- **Application**: Casos de uso (Checkout, GetProducts).
- **Infrastructure**: Implementación de persistencia con TypeORM y base de datos Postgres.
- **Presentation**: Controladores REST (NestJS) e interfaz de usuario (Angular).

## Requisitos
- Node v23.2.0 y postgreSQL

## Ejecución

1. Acceder a la carpeta de backend y abrir una terminal y ejecutar el comando npm run start:dev
2. Acceder a la carpeta de frontend y abrir una terminal y ejecutar el comando ng serve
3. Acceder a las aplicaciones:
   - **Frontend**: http://localhost:80
   - **Base de Datos**: Postgres en el puerto 5432

## Pruebas

Para ejecutar las pruebas unitarias del backend:
```bash
cd backend
npm run test
```
