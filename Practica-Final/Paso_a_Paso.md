## Crear un Cluster en MongoDB

![1](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica-Final/img/crear_cluster.png)

## Conectarse al cluster desde MongodbCompass

```bash
mongodb+srv://usuario:password@cluster0.mongodb.net/mydb?retryWrites=true&w=majority
```

![2](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica-Final/img/conectar_cluster.png)
![3](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica-Final/img/conectar_compass.png)


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

De las diferentes tablas se ha creado
