## Ejercicio 1: Encontrar portátiles de una marca con más de 8GB de RAM

```bash
{"especificaciones.ram": { "$gt": 8 }}
```

## Ejercicio 2: Buscar productos con la etiqueta “oferta”

```bash
{tags : 'oferta'}		
```

## Ejercicio 3: Incrementar el stock de un producto en 10 unidades

```bash
db["Productos"].updateOne( { "nombre": "Portátil Pro-Book X1" },   // filtro para encontrar el producto
  { $inc: { "stock": 10 } }       )
```

## Ejercicio 4: Añadir una nueva review a un producto

```bash
db["Productos"].updateOne({ "nombre": "Portátil Pro-Book X1" },{$push: {"reviews": {usuario: "CarlosM",
        puntuacion: 4,
        comentario: "Buen portátil, aunque algo pesado."}}})
```

# Parte 3 : Pipeline

## En este caso, se desea calcular la puntuación media de las reseñas 
## para cada producto de la colección.

```bash
db["Productos"].aggregate([
  { $unwind: "$reviews" },
  { $group: {
      _id: "$_id",                       
      avgPuntuacion: { $avg: "$reviews.puntuacion" }
    }
  }
])
```

# Parte 4 : Ejercicios adicionales

## 1 Mostrar productos con bajo stock

```bash
{ stock: { $lt: 5 } }
```
## 2 Proyección de campos específicos 

```bash
 {}, { nombre: 1,precio: 1, _id: 0 }

````

## 3 Eliminar un producto por su identificador

```bash
deleteOne({_id: "SKU-001"})

```
