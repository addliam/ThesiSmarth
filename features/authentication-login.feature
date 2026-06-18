Feature: Autenticacion y login de usuarios en ThesiSmart
  Como usuario registrado de ThesiSmart
  quiero ingresar a mi cuenta o recuperar mi contrasena
  para acceder nuevamente a la aplicacion academica.

  Background:
    Given que el usuario abre la pantalla "auth.html"
    And visualiza el formulario de autenticacion de ThesiSmart

  Scenario: Inicio de sesion exitoso como estudiante
    Given que el usuario selecciona el rol "Estudiante"
    And escribe el correo "demo@gmail.com"
    And escribe la contrasena "demo"
    When presiona el boton "Ingresar"
    Then el sistema valida las credenciales del estudiante
    And redirige al usuario a "dashboard-estudiante.html"

  Scenario: Inicio de sesion exitoso como asesor
    Given que el usuario selecciona el rol "Asesor"
    And escribe el correo "demo@gmail.com"
    And escribe la contrasena "demo"
    When presiona el boton "Ingresar"
    Then el sistema valida las credenciales del asesor
    And redirige al usuario a "dashboard-asesor.html"

  Scenario: Campos obligatorios vacios
    Given que el usuario no ingresa correo electronico
    And no ingresa contrasena
    When presiona el boton "Ingresar"
    Then el sistema muestra un mensaje de error junto al campo de correo
    And muestra un mensaje de error junto al campo de contrasena
    And mantiene al usuario en la pantalla "auth.html"

  Scenario: Formato de correo invalido
    Given que el usuario escribe el correo "usuario-sin-formato"
    And escribe la contrasena "demo"
    When presiona el boton "Ingresar"
    Then el sistema muestra una validacion de formato junto al campo de correo
    And no redirige al usuario a ningun dashboard

  Scenario: Credenciales incorrectas
    Given que el usuario selecciona el rol "Estudiante"
    And escribe el correo "demo@gmail.com"
    And escribe la contrasena "PasswordIncorrecto"
    When presiona el boton "Ingresar"
    Then el sistema muestra un mensaje claro de credenciales incorrectas
    And mantiene disponible el formulario para corregir los datos
    And no redirige al usuario a ningun dashboard

  Scenario: Recuperacion de contrasena
    Given que el usuario no recuerda su contrasena
    When selecciona el enlace "Olvide mi contrasena"
    Then el sistema muestra un formulario de recuperacion de acceso
    When escribe el correo "demo@gmail.com"
    And envia la solicitud de recuperacion
    Then el sistema muestra una confirmacion simulada de recuperacion

  Scenario: Verificacion basica de lineamientos UI y accesibilidad
    Given que el usuario visualiza la pantalla de autenticacion
    Then los campos de correo, contrasena y rol tienen labels visibles
    And los mensajes de error se muestran cerca del campo correspondiente
    And los textos y botones tienen contraste legible
    And el usuario puede navegar por el formulario usando el teclado
    And los estados de foco son visibles en controles y enlaces
