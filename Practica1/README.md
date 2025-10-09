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
