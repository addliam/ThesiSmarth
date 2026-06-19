@tesis @editor @EP04
Feature: Gestion y estructuracion de una tesis en ThesiSmart
  Como estudiante con una tesis activa
  quiero editar sus componentes metodologicos y revisar su coherencia
  para avanzar de forma ordenada en mi investigacion.

  Background:
    Given que el estudiante abre la pantalla "gestionar-tesis.html"
    And visualiza el flujo de seis secciones de la tesis

  @AT-GT-001 @HU26
  Scenario: Edicion del problema de investigacion
    Given que el estudiante se encuentra en la seccion "Problema"
    When modifica el planteamiento del problema
    Then el campo conserva el texto ingresado durante la edicion
    And ajusta su altura para mantener el contenido visible

  @AT-GT-002 @HU28
  Scenario: Registro de un objetivo especifico pendiente
    Given que el estudiante se encuentra en la seccion "Objetivos"
    And existe un objetivo especifico pendiente
    When completa el texto del objetivo
    Then el estado cambia a "Objetivo registrado"
    And el porcentaje de progreso de objetivos se actualiza

  @AT-GT-003 @HU28 @validacion
  Scenario: Bloqueo de avance por objetivos pendientes
    Given que el estudiante se encuentra en la seccion "Objetivos"
    And existe al menos un objetivo especifico pendiente
    When presiona el boton "Siguiente"
    Then el sistema informa cuantos objetivos faltan completar
    And mantiene visible la seccion "Objetivos"

  @AT-GT-004 @HU28
  Scenario: Incorporacion de un nuevo objetivo especifico
    Given que el estudiante se encuentra en la seccion "Objetivos"
    When presiona la accion "Agregar objetivo especifico"
    Then el sistema agrega un nuevo campo numerado
    And coloca el foco en el nuevo campo
    And actualiza el total usado para calcular el progreso

  @AT-GT-005 @HU29
  Scenario: Incorporacion de una hipotesis especifica
    Given que el estudiante se encuentra en la seccion "Hipotesis"
    When presiona la accion "Agregar hipotesis especifica"
    Then el sistema agrega un nuevo campo numerado
    And permite registrar la nueva hipotesis

  @AT-GT-006 @HU30
  Scenario: Visualizacion de validaciones de coherencia
    When el estudiante navega por las secciones metodologicas
    Then visualiza estados de coherencia, atencion o recomendacion
    And cada estado presenta un mensaje relacionado con la seccion activa

  @AT-GT-007 @HU35
  Scenario: Aplicacion o descarte de una sugerencia
    Given que la seccion activa presenta sugerencias de IA
    When el estudiante presiona "Aplicar" o "Ignorar" en una sugerencia
    Then el sistema retira visualmente la sugerencia procesada
    And mantiene disponibles las demas sugerencias

  @AT-GT-008 @HU31
  Scenario: Feedback visual al guardar avances
    When el estudiante presiona el boton "Guardar"
    Then el boton muestra temporalmente el estado "Guardado"
    And evita envios repetidos durante la confirmacion
    And vuelve a estar disponible al finalizar el feedback

  @AT-GT-009 @HU34
  Scenario: Navegacion entre secciones con los controles de avance
    Given que el estudiante se encuentra en una seccion sin campos pendientes
    When presiona los botones "Anterior" o "Siguiente"
    Then el sistema muestra la seccion correspondiente
    And actualiza el indicador visual del flujo

  @AT-GT-010 @HU34 @accesibilidad
  Scenario: Navegacion entre secciones mediante teclado
    Given que el foco esta sobre un elemento del indicador de secciones
    When el estudiante presiona la tecla "Enter" o "Espacio"
    Then el sistema abre la seccion seleccionada
    And mantiene visible su estado activo
