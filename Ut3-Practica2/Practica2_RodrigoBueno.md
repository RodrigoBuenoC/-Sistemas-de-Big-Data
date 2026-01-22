# Práctica 2: El Pergamino Infinito (Consumo de APIs)
## En esta misión, usarás tus habilidades diplomáticas para extraer información de la PokéAPI.El objetivo es obtener una lista de elementos, sus estadísticas y transformarlas en información útil para la aldea.


##  bucle while para la paginación.

```bash
while url:
    # 1. Lanzar la petición
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()

        # 2. Guardar el botín (Añadir los resultados a nuestra lista maestra)
        # Usamos .extend() para mezclar la lista nueva con la que ya tenemos
        pokemons_de_esta_pagina = data['results']
        todos_los_pokemon.extend(pokemons_de_esta_pagina)

        print(f"-> Página capturada. Total en la bolsa: {len(todos_los_pokemon)}")

        # 3. Buscar el siguiente punto de salto (Actualizar la URL)
        # La API nos da el enlace a la siguiente página en el campo "next"
        # Si es la última página, data['next'] será None y el while se detendrá
        url = data['next']

        # 4. Sigilo Ninja (Pausa para no ser detectado/bloqueado por la API)
        time.sleep(0.2) 

    else:
        print(f"La misión falló con código {response.status_code}")
        break
print(f"Has recolectado un total de: {len(todos_los_pokemon)} Pokémon.")

```
  ![1](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut3-Practica2/img/1.png)

## Extraccion de datos 1 a 1

```bash
pokedex_detallada = []

print("\n FASE 2: Extrayendo los datos")

for pokemon in todos_los_pokemon[:3]:
    
    url_detalle = pokemon['url']
    nombre_pokemon = pokemon['name']
   

    
    # Petición a la URL específica del Pokémon
    response_det = requests.get(url_detalle)
    
    if response_det.status_code == 200:
        data_det = response_det.json()
        
        # --- AQUÍ OCURRE EL APLANADO ---
        # Extraemos solo lo que nos importa y descartamos el resto del JSON gigante
        perfil_ninja = {
            "nombre": data_det['name'],    
            "id": data_det['id'],          
            "altura": data_det['height'],  
            "peso": data_det['weight']     
        }
        
        pokedex_detallada.append(perfil_ninja)
        print(f"   Datos extraídos de:{url_detalle}")
        
        time.sleep(0.5) # Respeto a la API

print("\nREPORTE FINAL:")
for p in pokedex_detallada:
    print(p)
```
![2](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut3-Practica2/img/2.png)

##  cálculo del BMI (IMC).

```bash
print("\n FASE 3: Generando Tabla y Calculando IMC...")

# Convertir a DataFrame
df = pd.DataFrame(pokedex_detallada)

# Limpieza de unidades (La Trampa de la API)
df['altura_m'] = df['altura'] / 10
df['peso_kg'] = df['peso'] / 10

# Cálculo del IMC
df['imc'] = df['peso_kg'] / (df['altura_m'] ** 2)
df['imc'] = df['imc'].round(2)

# Mostrar resultado final
print(df[['nombre', 'altura_m', 'peso_kg', 'imc']])
```
![3](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Ut3-Practica2/img/3.png)



# Preguntas de Reflexión:

## 1 ¿Por qué es importante actualizar la URL con el enlace next en lugar de simplemente incrementar un número de página manualmente?
Robustez y Adaptabilidad.

## 2. ¿Qué ventaja tiene normalizar (ETL) vs. hacerlo en Excel?
La ventaja clave es la Reproducibilidad y Automatización.

## 3. Si el límite fuera 1000 registros por página, ¿cómo afectaría al rendimiento?
El rendimiento mejoraría drásticamente. Tu script se volvería mucho más rápido.
