# Opción : API con Node.js y Express

## 1 He instalado node.js , un nuevo proyecto y agrega las dependencias:

```bash
npm init -y
npm install express neo4j-driver
```

## 2 .Crea un archivo index.js


````bash
const express = require('express');
const neo4j = require('neo4j-driver');
const app = express();
app.use(express.json());

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'password')
);

app.get('/users', async (req, res) => {
  const session = driver.session();
  const result = await session.run('MATCH (u:User) RETURN u.username AS username, u.name AS name');
  const users = result.records.map(r => r.toObject());
  res.json(users);
  await session.close();
});

// ✅ Crear un nuevo usuario
app.post('/users', async (req, res) => {
  const { username, name } = req.body;
  const session = driver.session();

  try {
    await session.run(
      'CREATE (u:User {username: $username, name: $name}) RETURN u',
      { username, name }
    );
    res.json({ status: 'ok', message: `Usuario ${username} creado correctamente.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});



app.post('/follow', async (req, res) => {
  const { from, to } = req.body;
  const session = driver.session();
  await session.run(`
    MATCH (a:User {username: $from}), (b:User {username: $to})
    MERGE (a)-[:FOLLOWS]->(b)
  `, { from, to });
  res.json({ status: 'ok', message: `${from} ahora sigue a ${to}.` });
  await session.close();
});

app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));
```

## 3 Ejecuta la aplicación:
```bash
node index.js
```
## Prueba la API en POSTMAN: 
```bash
http://localhost:3000/users
```

  ![2](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica2/img/2.png)
  ![3](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica2/img/3.png)

