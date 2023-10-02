# Documentación de Endpoints

Este es el API para el sistema de tickets de la Fundación por México. La base de datos está en una instancia de MongoDB Atlas, y el front end fue hecho en el framework React-Admin, lo cual determino mucho de las formas de los endpoints. 

---

## Listado de endpoints

### Usuarios 

Endpoints para el manejo de usuarios del sistema. Dirección desde root: /Usuarios

**/newUser | Post**
Espera un JSON con las siguientes llaves: correo, nombre_completo, contrasena, rol. Regresa el estado 201 en caso de haber creado el usuario correctamente.

**/login | Post**
Espera un JSON con dos llaves: correo y contrasena. Regresa un JSON con los siguientes atributos en caso de éxito: "token" para un JWT usado para Auth, "id" siendo el correo con el que se identifica al usuario, y "fullName" para el nombre completo del usuario. 