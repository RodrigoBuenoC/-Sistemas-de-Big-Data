## Crear un Cluster en MongoDB

![1](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica-Final/img/crear_cluster.png)

## Conectarse al cluster desde MongodbCompass

```bash
mongodb+srv://usuario:password@cluster0.mongodb.net/mydb?retryWrites=true&w=majority
```

![2](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica-Final/img/conectar_cluster.png)
![3](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica-Final/img/conectar_compass.png)


## Introducir Datos en MongoDB

```bash
// ===============================
//  CREACIÓN DE COLECCIONES
// ===============================

db.createCollection("restaurantes");
db.createCollection("riders");
db.createCollection("usuarios");
db.createCollection("pedidos");

// ===============================
//  INSERTAR RESTAURANTES
// ===============================
db.restaurantes.insertMany([
  {
    nombre: "Burger Planet",
    categorias: ["burgers", "fast-food"],
    menu: [
      { plato: "Cheeseburger", precio: 8.90 },
      { plato: "Patatas Deluxe", precio: 3.50 },
      { plato: "Nuggets", precio: 4.20 }
    ]
  },
  {
    nombre: "La Pasta Loca",
    categorias: ["italiano", "pasta"],
    menu: [
      { plato: "Spaghetti Carbonara", precio: 9.50 },
      { plato: "Lasaña", precio: 8.80 }
    ]
  }
]);

// ===============================
//  INSERTAR RIDERS
// ===============================
db.riders.insertMany([
  {
    nombre: "Carlos",
    vehiculo: "moto",
    estado: "disponible"
  },
  {
    nombre: "Lucia",
    vehiculo: "bici",
    estado: "ocupado"
  },
  {
    nombre: "Javier",
    vehiculo: "coche",
    estado: "disponible"
  }
]);

// ===============================
//  INSERTAR USUARIOS
// ===============================
db.usuarios.insertMany([
  {
    nombre: "Ana García",
    direccion: "C/ Sevilla 32",
    telefono: "600123456"
  },
  {
    nombre: "Mario Torres",
    direccion: "Av. Extremadura 10",
    telefono: "611987654"
  }
]);

// ===============================
//  INSERTAR PEDIDOS
// ===============================
// Necesitamos obtener IDs reales
const restaurante1 = db.restaurantes.findOne({ nombre: "Burger Planet" })._id;
const restaurante2 = db.restaurantes.findOne({ nombre: "La Pasta Loca" })._id;

const usuario1 = db.usuarios.findOne({ nombre: "Ana García" })._id;
const usuario2 = db.usuarios.findOne({ nombre: "Mario Torres" })._id;

const rider1 = db.riders.findOne({ nombre: "Carlos" })._id;
const rider2 = db.riders.findOne({ nombre: "Lucia" })._id;

db.pedidos.insertMany([
  {
    usuarioId: usuario1,
    restauranteId: restaurante1,
    riderId: rider1,
    items: [
      { plato: "Cheeseburger", cantidad: 2, precio_unitario: 8.90 },
      { plato: "Patatas Deluxe", cantidad: 1, precio_unitario: 3.50 }
    ],
    total: 21.30,
    estado: "en_reparto",
    fecha: new Date(),
    notas: "Llamar al timbre"
  },
  {
    usuarioId: usuario2,
    restauranteId: restaurante2,
    riderId: null,
    items: [
      { plato: "Spaghetti Carbonara", cantidad: 1, precio_unitario: 9.50 }
    ],
    total: 9.50,
    estado: "pendiente",
    fecha: new Date(),
    notas: ""
  }
]);

print("Datos cargados correctamente en MongoDB.");
```

## Crear una API (Postman)

Para ello necesitamos un archivo `index.js` para concertar la BBDD  con Postman

Instalamos dependencias:

```bash
npm init -y
```

```bash
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://moorichee2026_db_user:Tontodelculo99@repartocomida.0hlca5u.mongodb.net/";
let db;
const oid = id => new ObjectId(id);

// ================================
// CONEXIÓN MONGO
// ================================
(async () => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db("test");
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err);
  }
})();


// ======================================================
// =================== RESTAURANTES CRUD =================
// ======================================================

app.get('/restaurantes', async (req, res) => {
  res.json(await db.collection('restaurantes').find().toArray());
});

app.get('/restaurantes/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('restaurantes').findOne({ _id: id }));
});

app.post('/restaurantes', async (req, res) => {
  const r = await db.collection('restaurantes').insertOne(req.body);
  res.json({ insertedId: r.insertedId });
});

app.put('/restaurantes/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('restaurantes').updateOne(
    { _id: id },
    { $set: req.body }
  ));
});

app.delete('/restaurantes/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('restaurantes').deleteOne({ _id: id }));
});


// ======================================================
// ====================== RIDERS CRUD ===================
// ======================================================

app.get('/riders', async (req, res) => {
  res.json(await db.collection('riders').find().toArray());
});

app.get('/riders/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('riders').findOne({ _id: id }));
});

app.post('/riders', async (req, res) => {
  const r = await db.collection('riders').insertOne(req.body);
  res.json({ insertedId: r.insertedId });
});

app.put('/riders/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('riders').updateOne(
    { _id: id },
    { $set: req.body }
  ));
});

app.delete('/riders/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('riders').deleteOne({ _id: id }));
});


// ======================================================
// ===================== USUARIOS CRUD ==================
// ======================================================

app.get('/usuarios', async (req, res) => {
  res.json(await db.collection('usuarios').find().toArray());
});

app.get('/usuarios/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('usuarios').findOne({ _id: id }));
});

app.post('/usuarios', async (req, res) => {
  const r = await db.collection('usuarios').insertOne(req.body);
  res.json({ insertedId: r.insertedId });
});

app.put('/usuarios/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('usuarios').updateOne(
    { _id: id },
    { $set: req.body }
  ));
});

app.delete('/usuarios/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('usuarios').deleteOne({ _id: id }));
});


// ======================================================
// ===================== PEDIDOS CRUD ===================
// ======================================================

app.get('/pedidos', async (req, res) => {
  res.json(await db.collection('pedidos').find().toArray());
});

app.get('/pedidos/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('pedidos').findOne({ _id: id }));
});

// calcular total
function calcTotal(items) {
  return items.reduce((t, item) => t + item.precio_unitario * item.cantidad, 0);
}

app.post('/pedidos', async (req, res) => {
  const datos = req.body;

  datos.usuarioId = oid(datos.usuarioId);
  datos.restauranteId = oid(datos.restauranteId);
  datos.riderId = datos.riderId ? oid(datos.riderId) : null;

  datos.total = calcTotal(datos.items);
  datos.fecha = new Date();

  const r = await db.collection('pedidos').insertOne(datos);
  res.json({ insertedId: r.insertedId });
});

app.put('/pedidos/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('pedidos').updateOne(
    { _id: id },
    { $set: req.body }
  ));
});

app.delete('/pedidos/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('pedidos').deleteOne({ _id: id }));
});


// ======================================================
// ================ CONSULTA COMPLEJA ====================
// ======================================================

app.get('/pedidos/activos', async (req, res) => {
  const pipeline = [
    { $match: { estado: { $in: ["pendiente", "preparando", "en_reparto"] } } },
    {
      $lookup: {
        from: "riders",
        localField: "riderId",
        foreignField: "_id",
        as: "rider"
      }
    },
    { $unwind: { path: "$rider", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: "$rider._id",
        rider: { $first: "$rider" },
        pedidos: { $push: "$$ROOT" },
        count: { $sum: 1 }
      }
    }
  ];

  res.json(await db.collection('pedidos').aggregate(pipeline).toArray());
});


// ================================
// INICIAR SERVIDOR
// ================================
app.listen(3000, () => console.log("API escuchando en puerto 3000"));

```

Para conectarlas se ejecuta el comando Node

```bash 
node index.js
```

MongoDB conectado

![4](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica-Final/img/Postman.png)

## Crear Fronted

Se ha creado archivos `.html` , `.css` , `.js`

Dentro del archivo `.js`

que conecta la API (POSTMAN) con el Fronted

```bash
const API = "http://localhost:3000";

```

> [!NOTE]
 > Los archivos `index.html` , `style.css` y `script.js` se han generado con Chat GPT


![5](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica-Final/img/Fronted.png)


## Endpoint creados funcionales,

De las diferentes tablas se ha creado un CRUD funcional

 - Ver todo
 - Ver por {id}
 - Editar por {id}
 - Crear 
 - Borrar por {id}
