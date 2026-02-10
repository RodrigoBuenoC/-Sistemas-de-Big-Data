# Práctica 1. El Rastro de la Grieta

## Objetivo :  Implementar un sistema de análisis en Python usando Pandas para realizar la limpieza, normalización y búsqueda avanzada de registros de acceso críticos.


Codigo : 

```bash
import pandas as pd

# 1. Carga del pergamino secreto
df = pd.read_csv('registros_misiones.csv')
df
```
id_reg	ts	nin_id	aldea	chakra	rango	status	desc
0	ANBU-1000	2025-02-02 11:11:00	Gaara	suna	998.21	S	Éxito	Vigilancia de puesto avanzado
1	ANBU-1001	2025-02-04 10:31:00	Temari	Konoha	6441.64	A	Éxito	Misión de reconocimiento en fronteras
2	ANBU-1002	2025-02-02 23:07:00	Shikamaru	Suna	NaN	D	Fallo	Movimiento sospechoso detectado
3	ANBU-1003	2025-02-04 05:00:00	Choji	Amegakure	1966.92	B	Sospechoso	Posible espía detectado
4	ANBU-1004	2025-02-05 14:13:00	Temari	Kiri	1205.96	S	Éxito	Escolta de persona VIP
...	...	...	...	...	...	...	...	...
1545	ANBU-1957	2025-02-04 04:32:00	Temari	Kumo	7202.06	C	Fallo	Escolta de persona VIP
1546	ANBU-1138	2025-02-03 08:46:00	Kankuro	Kiri	2591.10	A	Éxito	Posible espía detectado
1547	ANBU-1061	2025-02-02 07:38:00	Temari	Suna	NaN	C	Fallo	Posible espía detectado
1548	ANBU-2226	2025-02-04 01:03:00	Sasuke	Konoha	6520.41	C	En curso	Patrulla rutinaria
1549	ANBU-2498	2025-02-05 00:10:00	Naruto	Kumo	2791.26	C	Sospechoso	Escolta de persona VIP
1550 rows × 8 columns

```bash
# --- SECCIÓN 1: LIMPIEZA DE DATOS ---

def limpiar_registro(df):
    # Reto 1: Elimina filas duplicadas.
    df = df.drop_duplicates()

    # Reto 2: Estandariza la columna 'aldea' (quitar espacios, solventar mayúsculas/minúsculas).
    df["aldea"] = df["aldea"].str.lower().str.strip()

    # Reto 3: Si 'nin_id' es nulo y la 'aldea' es 'Kiri', rellena con 'Ninja de la Niebla Anonimo'.
    df.loc[df['nin_id'].isna() & (df['aldea'] == 'Kiri'), 'nin_id'] = 'Ninja de la Niebla Anonimo'

    # Reto 4: Convierte 'ts' a datetime.
    df['ts'] = pd.to_datetime(df['ts'], errors='coerce')

    # Reto 5: Filtra o corrige niveles de chakra imposibles (<= 0 o > 100.000).
    df = df[(df['chakra'] > 0) & (df['chakra'] <= 100000)]

    # Reto 6: Renombra las columnas:
    df = df.rename(columns={
        'id_reg': 'ID',
        'ts': 'Fecha',
        'nin_id': 'Ninja',
        'status': 'Estado',
        'desc': 'Descripcion'
    })
    # Tu código aquí
    return df

# --- SECCIÓN 2: BÚSQUEDA Y CONSULTAS ---

def realizar_consultas(df):

    # Reto 7: Busca descripciones con las palabras 'espía', 'sospechoso' o 'enemigo'.
    resultado1 = df[df['Descripcion'].str.contains('espía', case=False, na=False)]

    resultado2 = df[df['Descripcion'].str.contains('sospechoso', case=False, na=False)]

    resultado3 = df[df['Descripcion'].str.contains('enemigo', case=False, na=False)]
    print("\n--- Reto 7 ---")
    print(resultado1,resultado2,resultado3)

    # Reto 8: Filtra ninjas de la 'Aldea de la Lluvia' (Amegakure) con chakra > 5000 y rango != 'D'.
    reto8 = df[
        (df['aldea'] == 'Amegakure') &
        (df['chakra'] > 5000) &
        (df['rango'] != 'D')
    ]
    print("\n--- Reto 8 ---")
    print(reto8)
    # Reto 9: Encuentra los accesos ocurridos de madrugada (entre las 23:00 y las 05:00).
    horas = df['Fecha'].dt.hour
    reto9 = df[(horas >= 23) | (horas <= 5)]
    print("\n--- Reto 9 ---")
    print(reto9)
    # Reto 10: Obtén el Top 5 ninjas con más chakra de cada aldea.
    reto10 = (
        df.sort_values('chakra', ascending=False)
        .groupby('aldea')
        .head(5)
        .sort_values('aldea')
    )
    print("\n--- Reto 10 ---")
    print(reto10)
    # Reto 11: Lista misiones de ninjas que NO pertenecen a la alianza (Konoha, Suna, Kumo).
    # Reto 12: Cuenta cuántas misiones de estado 'Fallo' hay por cada aldea.

    # Tu código aquí
    pass

# --- EJECUCIÓN DEL PROTOCOLO ANBU ---
print("Iniciando Rastreo de Chakra de Rodrigo Bueno...")
df_limpio = limpiar_registro(df)
realizar_consultas(df_limpio)
df_limpio.to_csv('misiones_limpias_Rodrigo Bueno.csv', index=False)

```
Iniciando Rastreo de Chakra de Rodrigo Bueno...

--- Reto 7 ---
             ID               Fecha      Ninja      aldea   chakra rango  \
3     ANBU-1003 2025-02-04 05:00:00      Choji  amegakure  1966.92     B   
9     ANBU-1009 2025-02-03 16:05:00  Shikamaru        iwa  7423.79     C   
11    ANBU-1011 2025-02-03 16:36:00    Kakashi       suna  4993.73     D   
17    ANBU-1017 2025-02-01 06:06:00    Kankuro        iwa  3955.04     B   
40    ANBU-1040 2025-02-05 15:19:00    Kankuro       kumo  7009.62     S   
...         ...                 ...        ...        ...      ...   ...   
1463  ANBU-2463 2025-02-06 15:52:00     Temari       kiri  6936.35     A   
1472  ANBU-2472 2025-02-06 21:51:00    Kakashi        iwa  3137.50     S   
1482  ANBU-2482 2025-02-05 07:58:00        Ino     konoha  1688.05     D   
1487  ANBU-2487 2025-02-04 18:11:00     Sakura        iwa  2597.15     C   
1492  ANBU-2492 2025-02-05 16:09:00      Gaara       suna  5496.61     C   

          Estado              Descripcion  
3     Sospechoso  Posible espía detectado  
9          Fallo  Posible espía detectado  
11         Fallo  Posible espía detectado  
17         Éxito  Posible espía detectado  
40         Éxito  Posible espía detectado  
...          ...                      ...  
1463  Sospechoso  Posible espía detectado  
1472    En curso  Posible espía detectado  
...
12         Éxito      Recuperación de pergamino secreto  
480        Éxito  Misión de reconocimiento en fronteras  
871   Sospechoso                 Escolta de persona VIP  
1036       Fallo                Posible espía detectado  
Output is truncated. View as a scrollable element or open in a text editor. Adjust cell output settings...
/tmp/ipython-input-1905194082.py:8: SettingWithCopyWarning: 
A value is trying to be set on a copy of a slice from a DataFrame.
Try using .loc[row_indexer,col_indexer] = value instead

See the caveats in the documentation: https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html#returning-a-view-versus-a-copy
  df["aldea"] = df["aldea"].str.lower().str.strip()
/tmp/ipython-input-1905194082.py:14: SettingWithCopyWarning: 
A value is trying to be set on a copy of a slice from a DataFrame.
Try using .loc[row_indexer,col_indexer] = value instead

See the caveats in the documentation: https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html#returning-a-view-versus-a-copy
  df['ts'] = pd.to_datetime(df['ts'], errors='coerce')


## Preguntas:

¿Cuántos registros duplicados has encontrado y qué impacto tendrían en un análisis de Big Data si no se eliminaran?

 - 46 duplicados, Distorsión de métricas.

¿Por qué es crítico convertir la columna de fecha a datetime antes de realizar búsquedas por franja horaria?
 - Es crítico convertir la columna de fecha a datetime porque permite que los datos de tiempo se interpreten correctamente y puedan analizarse de forma precisa. 

¿Cómo has manejado los niveles de chakra > 100,000? ¿Crees que son errores de sensor o posibles técnicas prohibidas?
 - filtro de validación para eliminar valores imposibles o fuera del rango esperado:

```bash
df = df[(df['chakra'] > 0) & (df['chakra'] <= 100000)]

```
