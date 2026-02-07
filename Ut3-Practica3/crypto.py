# ==============================
# IMPORTACION DE LIBRERIAS
# ==============================

# requests -> permite hacer peticiones HTTP a páginas web
import requests

# BeautifulSoup -> permite analizar el HTML y extraer información
from bs4 import BeautifulSoup

# pandas -> permite organizar los datos y exportarlos a CSV
import pandas as pd

# time -> permite pausar el programa para evitar bloqueos por muchas peticiones
import time


# ==============================
# CONFIGURACION GENERAL
# ==============================

# Número total de criptomonedas que queremos obtener
OBJETIVO = 500

# URL base de CoinMarketCap con paginación
BASE_URL = "https://coinmarketcap.com/?page={}"

# Encabezado para simular que la petición viene de un navegador real
HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

# Lista donde se guardarán los datos extraídos
datos = []

# Variable que controla la página actual
pagina = 1


# ==============================
# FUNCION PARA LIMPIAR NUMEROS
# ==============================

def limpiar_numero(valor):
    """
    Convierte un texto con formato monetario a número decimal.
    Ejemplo: "$1,234.56" -> 1234.56
    """

    # Eliminamos símbolos innecesarios
    valor = valor.replace("$", "").replace(",", "").replace("--", "").strip()

    # Intentamos convertir el texto a número
    try:
        return float(valor)
    except:
        return 0.0


# ==============================
# BUCLE PRINCIPAL DE EXTRACCION
# ==============================

# El bucle continuará hasta alcanzar el número objetivo de monedas
while len(datos) < OBJETIVO:

    print(f"Procesando página {pagina}...")

    # Construimos la URL de la página actual
    url = BASE_URL.format(pagina)

    # Realizamos la petición HTTP
    response = requests.get(url, headers=HEADERS)

    # Convertimos el HTML en un objeto analizable
    soup = BeautifulSoup(response.text, "html.parser")

    # Seleccionamos todas las filas de la tabla principal
    filas = soup.select("tbody tr")

    # Recorremos cada fila (cada criptomoneda)
    for fila in filas:

        # Si ya alcanzamos el objetivo, detenemos el bucle
        if len(datos) >= OBJETIVO:
            break

        # Extraemos todas las celdas de la fila
        celdas = fila.find_all("td")

        # Verificamos que la fila tenga suficientes columnas
        if len(celdas) < 9:
            continue

        try:
            # Extraemos nombre y símbolo (están juntos en la misma celda)
            texto = celdas[2].get_text("\n").split("\n")

            if len(texto) < 2:
                continue

            nombre = texto[0].strip()
            simbolo = texto[1].strip()

            # Extraemos y limpiamos los datos financieros
            precio = limpiar_numero(celdas[3].get_text())
            market_cap = limpiar_numero(celdas[7].get_text())
            volumen_24h = limpiar_numero(celdas[8].get_text())

            # Guardamos los datos en la lista
            datos.append({
                "Nombre": nombre,
                "Simbolo": simbolo,
                "Precio": precio,
                "MarketCap": market_cap,
                "Volumen_24h": volumen_24h
            })

        except:
            # Si ocurre algún error, ignoramos la fila
            continue

    print(f"Monedas acumuladas: {len(datos)}")

    # Pasamos a la siguiente página
    pagina += 1

    # Pausa para evitar bloqueo del servidor
    time.sleep(2)


# ==============================
# EXPORTACION DE DATOS
# ==============================

# Convertimos la lista en un DataFrame de pandas
df = pd.DataFrame(datos)

# Guardamos los datos en un archivo CSV
df.to_csv("cripto_data.csv", index=False)

print("Extracción completada.")
print(f"Total monedas guardadas: {len(datos)}")
