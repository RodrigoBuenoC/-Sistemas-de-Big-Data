# Práctica 5: Operaciones CRUD en DynamoDB

## 1. Diseño y Creación de la Tabla

```bash
aws dynamodb create-table \
    --table-name SensoresEcoCity \
    --attribute-definitions \
        AttributeName=sensor_id,AttributeType=S \
        AttributeName=timestamp,AttributeType=S \
    --key-schema \
        AttributeName=sensor_id,KeyType=HASH \
        AttributeName=timestamp,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST
```


![1](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica5/img/1.png)

## 2. Ingesta de Datos (Create)

```bash

aws dynamodb put-item \
  --table-name SensoresEcoCity \
  --item '{
      "sensor_id": {"S": "Sensor1"},
      "timestamp": {"S": "2025-01-01T10:00:00Z"},
      "tipo": {"S": "Temperatura"},
      "valor": {"N": "22.5"},
      "estado": {"S": "OK"}
  }'


aws dynamodb put-item \
  --table-name SensoresEcoCity \
  --item '{
      "sensor_id": {"S": "Sensor1"},
      "timestamp": {"S": "2025-01-01T11:00:00Z"},
      "tipo": {"S": "Ruido"},
      "valor": {"N": "23.1"},
      "estado": {"S": "OK"}
  }'



aws dynamodb put-item \
  --table-name SensoresEcoCity \
  --item '{
      "sensor_id": {"S": "Sensor1"},
      "timestamp": {"S": "2025-01-01T12:00:00Z"},
      "tipo": {"S": "CO2"},
      "valor": {"N": "41"},
      "estado": {"S": "Alerta"}
  }'



aws dynamodb put-item \
  --table-name SensoresEcoCity \
  --item '{
      "sensor_id": {"S": "Sensor2"},
      "timestamp": {"S": "2025-01-01T09:30:00Z"},
      "tipo": {"S": "CO2"},
      "valor": {"N": "38"},
      "estado": {"S": "OK"}
  }'




aws dynamodb put-item \
  --table-name SensoresEcoCity \
  --item '{
      "sensor_id": {"S": "Sensor2"},
      "timestamp": {"S": "2025-01-01

```

![2](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica5/img/2.png)


## 3. Consulta de Datos (Read - Query)

```bash
aws dynamodb query \
    --table-name SensoresEcoCity \
    --key-condition-expression "sensor_id = :sid" \
    --expression-attribute-values '{":sid": {"S": "Sensor1"}}'

```

![3](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica5/img/3.png)


## 4. Actualización de Datos (Update)

```bash
aws dynamodb update-item \
    --table-name SensoresEcoCity \
    --key '{"sensor_id": {"S": "Sensor2"}, "timestamp": {"S": "2025-01-01T10:00:00Z"}}' \
    --update-expression "SET estado = :e, Nota = :val" \
    --expression-attribute-values '{
        ":e": {"S": "Mantenimiento"},
        ":val": {"S": "Recalibrado por técnico"}
    }' \
    --return-values UPDATED_NEW

```
 Antes

![4.1](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica5/img/4.1.png)

 Despues
![4.2](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica5/img/4.2.png)


## 5. Eliminación de Datos (Delete)

```bash
aws dynamodb delete-item \
    --table-name SensoresEcoCity \
    --key '{"sensor_id": {"S": "Sensor2"}, "timestamp": {"S": "2025-01-01T10:00:00Z"}}'
```
![5](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica5/img/5png)
![5.1](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica5/img/5.1.png)


## 6. Reto Avanzado: Alertas Globales (Opcional)

```bash
aws dynamodb query \
    --table-name SensoresEcoCity \
    --index-name EstadoIndex \
    --key-condition-expression "estado = :a" \
    --expression-attribute-values '{":a": {"S": "Alerta"}}'

```
