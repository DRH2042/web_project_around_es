# Project Around The U.S. – Sprint 12

## Descripción

Around The U.S. es una página web interactiva donde los usuarios pueden editar su perfil, actualizar su foto de perfil, agregar nuevas tarjetas, dar o quitar "me gusta", eliminar tarjetas propias y visualizar imágenes en una ventana emergente.

En este sprint, el proyecto fue conectado a una API externa, permitiendo que la información del usuario, las tarjetas, los likes, la eliminación de tarjetas y la actualización del avatar se guarden en el servidor.

## Funcionalidades

- Carga de información del usuario desde el servidor.
- Carga de tarjetas desde el servidor.
- Edición del perfil del usuario.
- Actualización de la foto de perfil.
- Creación de nuevas tarjetas.
- Eliminación de tarjetas propias con popup de confirmación.
- Ocultamiento del botón de eliminar en tarjetas que no pertenecen al usuario.
- Funcionalidad de "me gusta" conectada al servidor.
- Apertura de imágenes en un popup.
- Validación de formularios.
- Indicador de carga en los botones mediante el texto "Guardando...".

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Programación orientada a objetos
- Módulos ES6
- API REST
- Fetch API
- Validación de formularios
- Git y GitHub

## Conexión con la API

El proyecto utiliza la API de TripleTen para obtener y actualizar información del usuario y de las tarjetas.

Solicitudes implementadas:

- `GET /users/me` para obtener la información del usuario.
- `GET /cards/` para obtener las tarjetas iniciales.
- `PATCH /users/me` para editar el perfil.
- `PATCH /users/me/avatar` para actualizar el avatar.
- `POST /cards/` para crear una nueva tarjeta.
- `DELETE /cards/:cardId` para eliminar una tarjeta.
- `PUT /cards/:cardId/likes` para agregar un like.
- `DELETE /cards/:cardId/likes` para quitar un like.

## Estructura del proyecto

web_project_around_es/
├── blocks/
├── images/
├── pages/
├── scripts/
│ ├── Api.js
│ ├── Card.js
│ ├── FormValidator.js
│ ├── Popup.js
│ ├── PopupWithConfirmation.js
│ ├── PopupWithForm.js
│ ├── PopupWithImage.js
│ ├── Section.js
│ ├── UserInfo.js
│ ├── index.js
│ └── utils.js
├── vendor/
├── index.html
└── README.md

## Autor

**Daniel Ramirez Holguin**  
GitHub: [DRH2042](https://github.com/DRH2042)
