# Práctica 4: Automatización de DynamoDB con Python y Boto3

## Parte 1: Preparando el Entorno de Programación

 - Instalamos Python
 - `pip install boto3`
 - `aws sts get-caller-identity`
 - `aws configure` 
 -  Copiamos `Acces key ID` , `Secret Acces Key` y `Token`
![1](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica4/img/1.png)

## Parte 2: Automatizando Operaciones con Boto3

Crea un archivo en tu editor de código favorito y llámalo `dynamodb_operations.py`

## 2.1. Conexión a DynamoDB

![2](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica4/img/2.png)


## Ejercicio 1: Crear un Nuevo Pedido

![3](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica4/img/3.png)

## Ejercicio 2: Leer un Pedido

![4](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica4/img/4.png)

## Ejercicio 3: Actualizar el Estado de un Pedido

![5](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica4/img/5.png)

## Ejercicio 4: Eliminar un Pedido

![7](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica4/img/7.png)


## Ejercicio 5: Buscar Pedidos por Cliente

![6](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica4/img/6.png)


## Parte 3: Demostración y Entrega


![8](https://github.com/RodrigoBuenoC/-Sistemas-de-Big-Data/blob/main/Practica4/img/8.png)


> [!NOTE]
> Reflexión Final
> `Automatización vs. Consola:` Eficiencia , Menor error humano 
> `SDK como Herramienta:` Boto3 permite automatizar prácticamente cualquier servicio de AWS DynamoDB: administrar bases de datos, realizar migraciones o generar informes automáticos.
> `Dificultades y Aprendizajes:`Dificultades comunes:
>Comprender cómo funciona la estructura de DynamoDB (clave primaria, sort key, atributos, etc.).
>Manejar correctamente las excepciones al interactuar con la API de AWS.
>Configurar las credenciales de AWS (access key, secret key, región) de forma segura.
>Diferenciar entre métodos como get_item, scan y query.
>Aprendizajes destacados:
>Cómo automatizar tareas que antes se hacían manualmente.
>La flexibilidad de Boto3 como interfaz para controlar los servicios de AWS desde código.
>La importancia de la seguridad y gestión de permisos (IAM) en la automatización.
>Cómo aplicar principios de programación y buenas prácticas en entornos en la nube.
