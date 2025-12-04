// ================================
// RESTAURANTES CRUD
// ================================
app.get('/restaurantes', async (req, res) => {
  res.json(await db.collection('restaurantes').find().toArray());
});

app.post('/restaurantes', async (req, res) => {
  const r = await db.collection('restaurantes').insertOne(req.body);
  res.json({ insertedId: r.insertedId });
});

app.delete('/restaurantes/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('restaurantes').deleteOne({ _id: id }));
});

// ================================
// RIDERS CRUD
// ================================
app.get('/riders', async (req, res) => {
  res.json(await db.collection('riders').find().toArray());
});

app.post('/riders', async (req, res) => {
  const r = await db.collection('riders').insertOne(req.body);
  res.json({ insertedId: r.insertedId });
});

app.delete('/riders/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('riders').deleteOne({ _id: id }));
});

// ================================
// USUARIOS CRUD
// ================================
app.get('/usuarios', async (req, res) => {
  res.json(await db.collection('usuarios').find().toArray());
});

app.post('/usuarios', async (req, res) => {
  const r = await db.collection('usuarios').insertOne(req.body);
  res.json({ insertedId: r.insertedId });
});

app.delete('/usuarios/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('usuarios').deleteOne({ _id: id }));
});

// ================================
// PEDIDOS CRUD
// ================================
app.get('/pedidos', async (req, res) => {
  res.json(await db.collection('pedidos').find().toArray());
});

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

app.delete('/pedidos/:id', async (req, res) => {
  const id = oid(req.params.id);
  res.json(await db.collection('pedidos').deleteOne({ _id: id }));
});

// ================================
// CONSULTA COMPLEJA
// Pedidos activos agrupados por rider
// ================================
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
