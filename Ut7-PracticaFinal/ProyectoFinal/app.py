import streamlit as st
import pandas as pd
import plotly.express as px
from sklearn.preprocessing import MinMaxScaler
from scipy.spatial.distance import euclidean
import plotly.graph_objects as go
# Cargar CSV
players = pd.read_csv("Ut7-PracticaFinal/ProyectoFinal/players_data.csv")

# Mostrar tabla
st.dataframe(players)

@st.cache_data
def cargar_datos():
    df = pd.read_csv(
        "Ut7-PracticaFinal/ProyectoFinal/players_data.csv"
    )
    return df

players = cargar_datos()

st.sidebar.title("Filtros")

team = st.sidebar.selectbox(
    "Selecciona equipo",
    players['Equipo'].unique()
)
edad_max = st.sidebar.slider(
    "Edad máxima",
    18,
    40,
    30
)
players_filtrado = players[
    (players['Equipo'] == team) &
    (players['Edad'] <= edad_max)
]

col1, col2, col3 = st.columns(3)

with col1:
    st.metric(
        "Jugadores",
        len(players_filtrado)
    )

with col2:
    st.metric(
        "Goles promedio",
        round(players_filtrado['Goles'].mean(), 2)
    )

fig = px.bar(
    players_filtrado,
    x='Nombre',
    y='Goles',
    color='Equipo'
)

st.plotly_chart(fig, use_container_width=True)

metricas = [
    'Goles',
    'Asistencias',
    'Pases_%'
    '',
    'Regates',
    'xG',
    'Recuperaciones'
]

scaler = MinMaxScaler()

players_scaled = players.copy()

players_scaled[metricas] = scaler.fit_transform(
    players[metricas]
)

jugador_objetivo = st.sidebar.selectbox(
    "Jugador objetivo",
    players['Nombre']
)

objetivo = players_scaled[
    players_scaled['Nombre'] == jugador_objetivo
]


def calcular_similares(df, objetivo, metricas):

    distancias = []

    vector_objetivo = objetivo[metricas].values[0]

    for i, row in df.iterrows():

        vector_jugador = row[metricas].values

        distancia = euclidean(
            vector_objetivo,
            vector_jugador
        )

        distancias.append(distancia)

    df['distancia'] = distancias

    similares = df.sort_values('distancia')

    return similares



resultado = calcular_similares(
    players_scaled,
    objetivo,
    metricas
)

resultado = resultado[
    resultado['Nombre'] != jugador_objetivo
]

top5 = resultado.head(5)


st.subheader("Jugadores más similares")

st.dataframe(top5)


valores = objetivo[metricas].values.flatten().tolist()

fig_radar = go.Figure()

fig_radar.add_trace(go.Scatterpolar(
    r=valores,
    theta=metricas,
    fill='toself',
    name=jugador_objetivo
))

fig_radar.update_layout(
    polar=dict(
        radialaxis=dict(
            visible=True,
            range=[0,1]
        )
    ),
    showlegend=True
)

st.plotly_chart(fig_radar)


potencial_min = st.sidebar.slider(
    "Potencial mínimo",
    0,
    100,
    80
)


cantera = players[
    (players['Edad'] <= 23) &
    (players['Potencial'] >= potencial_min)
]

st.subheader("Promesas")
st.dataframe(cantera)

players['indice_valor'] = (
    players['Goles'] +
    players['Asistencias'] +
    players['Recuperaciones']
) / players['Valor_Mercado']

valor = players.sort_values(
    'indice_valor',
    ascending=False
)

st.subheader("Jugadores infravalorados")

st.dataframe(valor.head(10))
