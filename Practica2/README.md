# Ejercicio 1: Diseño del Modelo de Datos de la Red Social
## Diseña un modelo de datos de grafo para representar usuarios y sus interacciones en una red social Considera los siguientes tipos de nodos y relaciones:

## Nodos: User: Con propiedades como username, name, registration_date. 

```bash
CREATE (:User {username: 'rodriibc3', 
name: 'Rodrigo', registration_date: date()})

CREATE (:User {username: 'Jose123',
name: 'Jose', registration_date: date()})
```

## Post: Con propiedades como content, timestamp.

```bash
CREATE (:Post {content: 'hola', timestamp: timestamp()})

```
## Relaciones:

## FOLLOWS: Entre User y User.

```bash
MATCH (a:User {username: 'rodriibc3'})
MATCH (b:User {username: 'Jose123'})
CREATE (a)-[:Follows]->(b)
RETURN a, b;
````

## POSTED: Entre User y Post.
```bash
MATCH (a:User {username: 'rodriibc3'})
MATCH (b:Post {content: 'hola'})
CREATE (a)-[:Posted]->(b)

```
## LIKES: Entre User y Post.
```bash
MATCH (a:User {username: 'Jose123'})
MATCH (b:Post {content: 'hola'})
CREATE (a)-[:Likes]->(b)

```

# Ejercicio 2: Creación de Nodos y Relaciones Iniciales

## Utiliza Cypher para crear los siguientes nodos y relaciones en tu base de datos.

Crear algunos nodos User: Tu tarea: Crea al menos tres nodos de tipo User con las propiedades username, name y registration_date. Asegúrate de que los username sean únicos.
```bash
CREATE (:User {username: 'alex1', 
name: 'Alejandro', registration_date: date()})
```
Crear relaciones FOLLOWS: Tu tarea: Crea algunas relaciones de tipo FOLLOWS entre tus usuarios (por ejemplo, Alice sigue a Bob, Bob sigue a Charlie).
```bash
MATCH (a:User {username: 'rodriibc3'})
MATCH (b:User {username: 'Jose123'})
CREATE (a)-[:Follows]->(b)
RETURN a, b;
````
Crear algunos Post y relaciones POSTED: Tu tarea: Haz que al menos dos de tus usuarios publiquen un Post. Cada Post debe tener content y timestamp.
```bash
MATCH (a:User {username: 'Jose123'})
MATCH (b:Post {content: 'hola'})
CREATE (a)-[:Posted]->(b)
```
Crear relaciones LIKES: Tu tarea: Haz que un usuario dé “Like” a un post de otro usuario.
```bash
MATCH (a:User {username: 'Jose123'})
MATCH (b:Post {content: 'hola'})
CREATE (a)-[:Likes]->(b)
```

# Ejercicio 3: Encontrar Amigos y Seguidores

## Encontrar todos los usuarios que un usuario específico sigue: Tu tarea: Escribe una consulta Cypher para encontrar todos los usuarios que ‘Alice’ (o cualquier usuario que hayas creado) sigue.

```bash
MATCH (a:User {username:"rodriibc3"})-[:Follows]->(b:User)
RETURN b;
```
## Encontrar todos los usuarios que siguen a un usuario específico: Tu tarea: Escribe una consulta Cypher para encontrar todos los usuarios que siguen a ‘Bob’ (o cualquier usuario que hayas creado).

```bash
MATCH (a:User {username:"alex1"})<-[:Follows]-(b:User)
RETURN b;
```
# Ejercicio 4: Analizando Posts e Interacciones
## Encontrar todos los posts de un usuario específico: Tu tarea: Escribe una consulta Cypher para encontrar todos los posts de ‘Alice’ (o cualquier usuario que hayas creado), mostrando el contenido y la fecha/hora.

```bash
MATCH (a:User {username:"alex1"})-[:Posted]->(b:Post)
RETURN b;
```

## Encontrar los posts que un usuario ha dado “Like”: Tu tarea: Escribe una consulta Cypher para encontrar los posts a los que ‘Alice’ (o cualquier usuario que hayas creado) ha dado “Like”, mostrando el contenido del post.
```bash
MATCH (a:User {username:"alex1"})-[:Likes]->(b:Post)
RETURN b;
```
# Ejercicio 5: Explorando el Grafo Visualmente
## Ejecuta algunas de tus consultas anteriores en el Neo4j Browser.

  ![1](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica2/img/1.png)


