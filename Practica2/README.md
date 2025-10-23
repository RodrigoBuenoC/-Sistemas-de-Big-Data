Ejercicio 1: Diseño del Modelo de Datos de la Red Social

Diseña un modelo de datos de grafo para representar usuarios y sus interacciones en una red social. Considera los siguientes tipos de nodos y relaciones:

Nodos:
User: Con propiedades como username, name, registration_date. 

```bash
CREATE (:User {username: 'rodriibc3', 
name: 'Rodrigo', registration_date: date()})

CREATE (:User {username: 'Jose123',
name: 'Jose', registration_date: date()})
```

    Post: Con propiedades como content, timestamp.

```bash
CREATE (:Post {content: 'hola', timestamp: timestamp()})

```
Relaciones:

FOLLOWS: Entre User y User.

```bash
MATCH (a:User {username: 'rodriibc3'})
MATCH (b:User {username: 'Jose123'})
CREATE (a)-[:FRIEND_OF]->(b)
RETURN a, b;
````

POSTED: Entre User y Post.
```bash
MATCH (a:User {username: 'rodriibc3'})
MATCH (b:Post {content: 'hola'})
CREATE (a)-[:Posted]->(b)

```
LIKES: Entre User y Post.
```bash
MATCH (a:User {username: 'Jose123'})
MATCH (b:Post {content: 'hola'})
CREATE (a)-[:Likes]->(b)

```

Ejercicio 2: Creación de Nodos y Relaciones Iniciales

Utiliza Cypher para crear los siguientes nodos y relaciones en tu base de datos.

Crear algunos nodos User: Tu tarea: Crea al menos tres nodos de tipo User con las propiedades username, name y registration_date. Asegúrate de que los username sean únicos.
```bash

```
Crear relaciones FOLLOWS: Tu tarea: Crea algunas relaciones de tipo FOLLOWS entre tus usuarios (por ejemplo, Alice sigue a Bob, Bob sigue a Charlie).
```bash

````
Crear algunos Post y relaciones POSTED: Tu tarea: Haz que al menos dos de tus usuarios publiquen un Post. Cada Post debe tener content y timestamp.
```bash
```
Crear relaciones LIKES: Tu tarea: Haz que un usuario dé “Like” a un post de otro usuario.
```bash
```

