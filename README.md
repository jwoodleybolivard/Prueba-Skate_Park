# Prueba - Skate Park

## Descripción

La Municipalidad de Santiago, ha organizado una competencia de Skate para impulsar el nivel deportivo de los jóvenes que desean representar a Chile en los X Games del próximo año, y han iniciado con la gestión para desarrollar la plataforma web en la que los participantes se podrán registrar y revisar el estado de su solicitud
En esta prueba deberás ocupar todos tus conocimientos para desarrollar un sistema que involucre tus habilidades como Full Stack Developer, consolidando tus competencias en el frontend y backend.

## Visuales 
![image](https://github.com/jwoodleybolivard/Prueba-Skate_Park/assets/125617339/aa1eb164-eb81-48fa-8e82-f10c682d5322)
*Imagen 1. Lista de participantes Fuente: Desafío Latam*

![image](https://github.com/jwoodleybolivard/Prueba-Skate_Park/assets/125617339/1839ea87-c86c-4016-9e52-e42fd67dafe7)
*Imagen 2. Registro de participantes Fuente: Desafío Latam*

![image](https://github.com/jwoodleybolivard/Prueba-Skate_Park/assets/125617339/ec98ba15-db62-4931-b8e3-913a01aa232b)
*Imagen 3. Inicio de sesión Fuente: Desafío Latam*

![image](https://github.com/jwoodleybolivard/Prueba-Skate_Park/assets/125617339/fc257853-6978-45a8-8709-d3b3edbda5ca)
*Imagen 4. Modificación de los datos del perfil Fuente: Desafío Latam*

![image](https://github.com/jwoodleybolivard/Prueba-Skate_Park/assets/125617339/306d5866-46eb-4d4b-b6ad-30aa0b6ee212)
*Imagen 5. Administración Fuente: Desafío Latam*

## Consideraciones 🚀

●    El sistema debe permitir registrar nuevos participantes.
●    Se debe crear una vista para que los participantes puedan iniciar sesión con su correo y contraseña.
●    Luego de  iniciar  la  sesión,  los participantes deberán poder  modificar sus  datos, exceptuando el correo electrónico y su foto. Esta vista debe estar protegida con JWT y los datos que se utilicen en la plantilla deben ser extraídos del token.
●    La  vista  correspondiente  a  la  ruta  raíz  debe  mostrar  todos  los  participantes registrados y su estado de revisión.
●    La  vista  del  administrador  debe  mostrar  los  participantes  registrados  y  permitir aprobarlos para cambiar su estado.

Se debe persistir la información de los usuarios en PostgreSQL, por lo que deberás usar las siguientes sentencias SQL para la creación de la base de datos y la tabla de participantes.

## Prerrequisitos 📋

Lista de software y herramientas, incluyendo versiones, que necesitas para instalar y ejecutar este proyecto:

-    Express
-    Handlebars
-    PostgreSQL 
-    JWT
-    Express-fileupload
-    jsonwebtoken
-    dotEnv


### Instalación 🔧

Una guía paso a paso sobre cómo configurar el entorno de desarrollo e instalar todas las dependencias.

#paso 1
instalar las dependencias con npm i creando la carpeta node_modules, la cual contiene la configuracion completa.

## Habilidades a evaluar ⚙️

●    Crear una API REST con el Framework Express.
●    Servir contenido dinámico con express-handlebars.
●    Ofrecer la funcionalidad Upload File con express-fileupload.
●    Implementar seguridad y restricción de recursos o contenido con JWT.

###  para ejecutar complemente con esta informacion:

- nodemon server.js

## Despliegue 📦

Se desplega a travez de la consola de visual studio con power shell.

## Construido Con 🛠️

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - El lenguaje utilizado
- [Express](https://expressjs.com/en/5x/api.html)- El framework web utilizado
- [Nodemon](https://www.npmjs.com/package/nodemon) - Servidor de ejecución

---

⌨️ con ❤️ por [J. Woodley Bolivard](https://github.com/jwoodleybolivard)
