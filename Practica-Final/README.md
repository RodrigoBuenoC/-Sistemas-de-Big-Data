# Documentación Inicial del Proyecto  
## Sistema de Pedidos de Comida a Domicilio (Trabajo de Clase)

---

## 1. Problema elegido

El proyecto consiste en desarrollar una aplicación web que simula un sistema básico de pedidos de comida a domicilio.  
Es un entorno pensado únicamente para uso académico, donde se trabajará con una base de datos NoSQL, una API REST y una interfaz sencilla.

El sistema gestionará tres tipos de datos principales:

- **Restaurantes**  
  Cada restaurante tendrá un nombre, categoría(s) y un menú formado por varios platos.

- **Riders**  
  Los repartidores tendrán un nombre, un vehículo (moto, bici, coche) y un estado (disponible u ocupado).

- **Pedidos**  
  Un pedido incluirá una lista de productos, sus precios y cantidades, el restaurante que lo prepara, el rider asignado (si lo hubiera), el usuario que realiza el pedido y un estado que evoluciona durante el proceso:
  - pendiente  
  - preparando  
  - en reparto  
  - entregado  

Los pedidos pueden ser diferentes entre sí: algunos tienen varios productos, otros solo uno; algunos tienen rider asignado, otros aún no; algunos pueden añadir observaciones del cliente, etc.

El sistema incluirá una **consulta compleja**:

> Obtener los pedidos activos (pendiente, preparando o en reparto) agrupados por rider, mostrando cuántos pedidos lleva cada uno.

---

## 2. Por qué se ha elegido este problema

Este problema es adecuado para un trabajo de clase porque:

- Es **fácil de entender** y de explicar.  
- Permite manejar datos **variados y flexibles**, ideales para NoSQL.  
- Incluye **subdocumentos y arrays** (items del pedido), que son muy útiles para aprender modelos documentales.  
- Permite practicar CRUD y una **consulta avanzada** usando agregaciones.  
- Se puede ampliar o simplificar fácilmente según las necesidades del proyecto.  
- Es perfecto para demostrar la comunicación entre la base de datos, la API y un frontend.

En resumen, es un proyecto muy manejable pero suficientemente completo para demostrar conocimientos técnicos.

---

## 3. Base de datos NoSQL elegida: MongoDB

La base de datos seleccionada es **MongoDB**, un sistema NoSQL orientado a documentos.

### Razones para elegir MongoDB

- **Flexibilidad del modelo documental:**  
  Cada pedido puede tener una estructura ligeramente distinta sin necesidad de definir un esquema rígido.

- **Subdocumentos naturales:**  
  Los menús, los items del pedido o la información del rider se representan fácilmente de forma anidada dentro de un documento.

- **Facilidad de uso en entornos académicos:**  
  MongoDB es sencillo de instalar y usar, especialmente con herramientas como MongoDB Atlas.

- **Rendimiento adecuado:**  
  Maneja bien lecturas y escrituras frecuentes, lo que encaja con un sistema de pedidos.

- **Compatibilidad con Node.js:**  
  La integración con un backend en Express es muy directa y facilita el desarrollo del proyecto.

---

## 4. Conclusión

El problema elegido y la base de datos MongoDB forman un conjunto ideal para un proyecto académico.  
Permiten trabajar con datos flexibles, documentos anidados, una API REST completa y una consulta avanzada mediante agregaciones.

Este documento sirve como punto de partida para el modelado de datos, el desarrollo del backend y la creación del frontend.
