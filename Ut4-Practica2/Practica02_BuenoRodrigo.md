# Práctica 2. El Rostro del Traidor (Detección de Anomalías)

```bash

import pandas as pd

# 1. Carga del pergamino secreto
df = pd.read_csv('misiones_limpias.csv')
df

# Ver la descripción estadística
descripcion = df.describe()
print(descripcion)

# Mostrar la media y desviación estándar de Nivel_Chakra específicamente
print("Media de Chakra:", df['Nivel_Chakra'].mean())
print("Desviación Estándar:", df['Nivel_Chakra'].std())

import seaborn as sns
import matplotlib.pyplot as plt

plt.figure(figsize=(8, 6))
# Usamos la columna Nivel_Chakra de nuestro DataFrame
sns.boxplot(y=df['Nivel_Chakra'], color='orange')
plt.title('Distribución de Nivel de Chakra de los Ninjas')
plt.ylabel('Nivel de Chakra')
plt.show()

# Calcular la media y la desviación estándar
media_chakra = df['Nivel_Chakra'].mean()
std_chakra = df['Nivel_Chakra'].std()

# Calcular el Z-Score
df['Z_Score'] = (df['Nivel_Chakra'] - media_chakra) / std_chakra

# Filtrar outliers (Z-Score > 3 o < -3)
infiltrados = df[df['Z_Score'].abs() > 3]
print("--- Posibles Infiltrados (Z-Score extremo) ---")
print(infiltrados.head())

# Ninjas con Chakra Negativo
chakra_negativo = df[df['Nivel_Chakra'] < 0]
print("--- Ninjas con Chakra Negativo ---")
print(chakra_negativo.head())

# Ninjas de la Aldea Desconocida
aldea_desconocida = df[df['Aldea'] == 'Desconocida']
print("--- Ninjas de Aldea Desconocida ---")
print(aldea_desconocida.head())

# Super Ninjas (Z-Score entre 2 y 3 o entre -2 y -3)
super_ninjas = df[(df['Z_Score'].abs() > 2) & (df['Z_Score'].abs() <= 3)]
print("--- Super Ninjas (Fuertes, pero no traidores) ---")
print(super_ninjas.head())

# Mostrar todos los datos de los sospechosos de Z-Score > 3 y de la Aldea Desconocida
# Veremos si coinciden
sospechosos = pd.concat([infiltrados, aldea_desconocida]).drop_duplicates()
print("--- Todos los Sospechosos ---")
print(sospechosos)

# Para ver si el infiltrado de chakra alto coincide con aldea desconocida:
coincidencia = pd.merge(infiltrados, aldea_desconocida, on='ID', how='inner')
print("¿Coinciden los infiltrados con la aldea desconocida?")
print(coincidencia)
```
![1](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut4-Practica2/img/1.png)

¿Por qué un outlier puede ser un error del sensor y no necesariamente un ataque? Pon un ejemplo.
Un outlier puede ser un error de medición. Por ejemplo, en el filtro de "Caza Mayor", encontramos un ninja con nivel de chakra negativo (-25.0). Dado que la energía vital no puede ser negativa biológicamente, esto es claramente un fallo técnico del sensor del pueblo y no una técnica enemiga.

Si eliminas los outliers, ¿cómo cambia la media del dataset? ¿Sube o baja?
Depende del outlier que quitemos. Si eliminamos al infiltrado del chakra gigante (350.0), la media general del dataset bajará (en mi simulación bajó de 100.13 a 99.88), ya que este valor extremo estaba empujando el promedio artificialmente hacia arriba.

¿Sería justo castigar a los “Super Ninjas” (Z-Score > 2 pero < 3) solo por ser fuertes? Justifica tu respuesta.
No sería justo bajo ningún concepto estadístico. En una distribución normal poblacional, es esperable y natural que aproximadamente el 4.2% de los individuos se sitúen entre 2 y 3 desviaciones estándar del promedio. Estos "Super Ninjas" representan a la élite de talento natural de la aldea, no una anomalía forzada externa (que son aquellos con probabilidad inferior al 0.3%, o Z-Score > 3).
