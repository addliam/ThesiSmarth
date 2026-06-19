@autenticacion @login @HU10 @HU11
Feature: Autenticacion y recuperacion de acceso en ThesiSmart
  Como usuario registrado de ThesiSmart
  quiero iniciar sesion o recuperar mi contrasena
  para acceder a las funciones de la plataforma academica.

  Background:
    Given que el usuario abre la pantalla "auth.html"
    And visualiza el formulario de autenticacion de ThesiSmart

  @AT-AUTH-001 @HU10 @estudiante
  Scenario: Inicio de sesion exitoso como estudiante
    Given que el usuario selecciona el rol "Estudiante"
    And escribe el correo "demo@gmail.com"
    And escribe la contrasena "demo"
    When presiona el boton "Ingresar"
    Then el sistema muestra la confirmacion "Credenciales validadas"
    And redirige al usuario a "dashboard-estudiante.html"

  @AT-AUTH-002 @HU10 @asesor
  Scenario: Inicio de sesion exitoso como asesor
    Given que el usuario selecciona el rol "Asesor"
    And escribe el correo "demo@gmail.com"
    And escribe la contrasena "demo"
    When presiona el boton "Ingresar"
    Then el sistema muestra la confirmacion "Credenciales validadas"
    And redirige al usuario a "dashboard-asesor.html"

  @AT-AUTH-003 @HU10 @validacion
  Scenario: Validacion de campos obligatorios vacios
    Given que el usuario no ingresa un correo electronico
    And no ingresa una contrasena
    When presiona el boton "Ingresar"
    Then el sistema muestra "Ingresa tu correo electronico" junto al campo de correo
    And muestra "Ingresa tu contrasena" junto al campo de contrasena
    And mantiene al usuario en la pantalla "auth.html"

  @AT-AUTH-004 @HU10 @validacion
  Scenario: Validacion de formato de correo invalido
    Given que el usuario escribe el correo "usuario-sin-formato"
    And escribe la contrasena "demo"
    When presiona el boton "Ingresar"
    Then el sistema muestra "Ingresa un correo con formato valido" junto al campo de correo
    And no redirige al usuario a ningun dashboard

  @AT-AUTH-005 @HU10 @error
  Scenario: Rechazo de credenciales incorrectas
    Given que el usuario selecciona el rol "Estudiante"
    And escribe el correo "demo@gmail.com"
    And escribe la contrasena "PasswordIncorrecto"
    When presiona el boton "Ingresar"
    Then el sistema informa que el correo, la contrasena o el rol son incorrectos
    And mantiene disponible el formulario para corregir los datos
    And no redirige al usuario a ningun dashboard

  @AT-AUTH-006 @HU11 @recuperacion
  Scenario: Recuperacion de contrasena
    Given que el usuario no recuerda su contrasena
    When selecciona el enlace "Olvide mi contrasena"
    Then el sistema muestra el formulario de recuperacion de acceso
    When escribe el correo "demo@gmail.com"
    And envia la solicitud de recuperacion
    Then el sistema confirma que la solicitud fue registrada

  @AT-AUTH-007 @HU10 @HU11 @accesibilidad
  Scenario: Verificacion de lineamientos UI y accesibilidad
    Given que el usuario visualiza la pantalla de autenticacion
    Then los campos de correo, contrasena y rol tienen labels visibles
    And los mensajes de error se muestran cerca del campo correspondiente
    And los textos y botones presentan contraste legible
    And el usuario puede recorrer los controles usando el teclado
    And los estados de foco son visibles en controles y enlaces
