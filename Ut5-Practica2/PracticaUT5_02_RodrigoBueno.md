
# Práctica 2. El Índice de las Sombras (NoSQL)


##  Ver todos los Ninjas creados
![1](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut5-Practica2/img/VerTodos.png)
	
## Buscar por Id
![2](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut5-Practica2/img/BuscarId.png)


## Buscar por otro que no sea la Partition Key (Clan)

![3](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut5-Practica2/img/VerClany.png)


## Qué es Gsi
Un Global Secondary Index (GSI) en Amazon DynamoDB es un índice adicional que te permite consultar una tabla usando atributos distintos a la clave primaria.	

## Por qué Scan es mucho más lento y costoso que Query	

El Scan es más lento y costoso porque DynamoDB debe leer todos los elementos de la tabla y luego filtrar los resultados. En cambio, Query utiliza la clave de partición o un índice para acceder directamente a los datos necesarios, leyendo solo una pequeña parte de la tabla y consumiendo menos unidades de lectura.
