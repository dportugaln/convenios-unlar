# Frontend Integrador Pilartecno

Este repositorio contiene el código fuente de la aplicación web "UNLaR Navigator", desarrollada con React.

## Descripción

Esta aplicación está diseñada para gestionar puntos de interés para la comunidad universitaria de la UNLaR, dentro y fuera de la Ciudad de la Ciencia y de la Técnica.

## Prerrequisitos

Para ejecutar este proyecto en tu entorno local, necesitarás tener instaladas las siguientes herramientas:

- Node.js, versión 20.9.0 o superior
- npm, versión 10.1.0 o superior
- GIT (opcional)

Puedes verificar las versiones que tienes instaladas ejecutando los siguientes comandos en tu terminal:

```bash
node --version
npm --version
```

## Instalación

Para instalar y ejecutar esta aplicación en tu entorno local, sigue estos pasos:

1. Clona el repositorio o descarga el código:

```bash
git clone https://github.com/dportugaln/frontend-integrador-pilartecno.git
```

2. Navega al directorio del proyecto:

```bash
cd frontend-integrador-pilartecno
```

3. Instala las dependencias:

```bash
npm install
```

4. Ejecuta la aplicación:

```bash
npm start
```


## Uso

### Agregar Puntos de Interés

1. Navega a la vista "Listado" seleccionando la opción correspondiente en el drawer o ingresando directamente a la URL ("/places").
2. En la vista "Listado", encontrarás un formulario para agregar nuevos puntos de interés. Los campos requeridos deben ser completados con la información correspondiente.
3. Una vez que hayas ingresado toda la información necesaria, haz clic en el botón "Agregar" para añadir el nuevo punto de interés a la lista.
4. Los puntos de interés agregados pueden ser editados o eliminados según sea necesario.

### Visualizar Puntos de Interés en el Mapa

1. Para visualizar los puntos de interés en el mapa, navega a la vista "Mapa" seleccionando la opción correspondiente en el drawer o ingresando directamente a la URL ("/map").
2. En la vista "Mapa", los puntos de interés se marcarán automáticamente en el mapa utilizando las coordenadas de latitud y longitud que se ingresaron en la vista "Listado".

## API

El backend de esta aplicación se ha implementado utilizando un servidor Express. Este servidor proporciona la API que nuestra aplicación React utiliza para interactuar con los datos.

El código fuente del backend se encuentra en un repositorio separado. Puedes acceder a este repositorio en el siguiente enlace: [Backend Integrador Pilartecno.](https://github.com/dportugaln/backend-integrador-pilartecno)

