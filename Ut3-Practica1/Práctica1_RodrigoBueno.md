# Práctica 1: Hijo de la Forja (Limpieza de Datos Masivos)

## Desarrollar un script de Python que realice la limpieza,normalización y validación de una fuente de datos masiva, generando un archivo final estructurado y fiable.

Evidencias :
El código utilizado esta en `ut3-practica1.ipynb`.

pasos (1-5)

1.
  ![1](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut3-Practica1/img/1.png)
2.
  ![2](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut3-Practica1/img/2.png)
3.
  ![3](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut3-Practica1/img/3.png)
4.
  ![4](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut3-Practica1/img/4.png)
5.
  ![5](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut3-Practica1/img/5.png)

Bitácora de Limpieza

  ![6](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut3-Practica1/img/6.png)

Preguntas de reflexión.

1. ¿Cuántos registros se perdieron en total? En total se eliminaron 749 registros (de los 15,451 originales quedaron 14,702).

451 eran filas duplicadas exactas.

298 se eliminaron por tener cantidades negativas (valores no válidos).

2. ¿Hubo algún caso de id repetido con datos distintos? No. Tras analizar los datos, confirmamos que todos los IDs repetidos formaban parte de filas duplicadas exactas.

¿Qué significa esto? Que no hubo casos donde el id: 50 dijera "Katana" en una fila y "Shuriken" en otra. Siempre que el ID se repetía, toda la información de la fila era idéntica.

¿Cómo se manejó? Al no haber conflictos de información (mismo ID con datos diferentes), la estrategia fue segura y sencilla: eliminar las copias exactas (drop_duplicates()). Esto garantiza que no se pierde información real, solo se limpia la redundancia.

3. ¿Por qué es más seguro usar la mediana que la media para imputar precios? Usar la mediana es preferible en datasets con "errores manuales" por su resistencia a los valores extremos (outliers):

La Media (Promedio) es sensible: Si por error alguien escribe un precio de 1,000,000 en lugar de 100, el promedio de todos los precios subirá artificialmente, "contaminando" los valores que intentes rellenar.

La Mediana es robusta: La mediana simplemente busca el "valor central" de la lista ordenada. Un error de 1,000,000 se queda al final de la lista y no afecta al valor central que usarás para rellenar los huecos.


Conclusión.

La limpieza y normalización de datos no son tareas "secundarias" o tediosas que se hacen antes del trabajo real;
son el trabajo real. Garantizan la integridad, la consistencia y, sobre todo, la confianza en los datos.
Sin esta etapa crítica, el Big Data es solo un gran volumen de ruido digital.
