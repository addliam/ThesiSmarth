@dashboard @estudiante @EP03
Feature: Dashboard principal del estudiante en ThesiSmart
  Como estudiante con una sesion iniciada
  quiero consultar y gestionar el resumen de mis tesis
  para conocer mi avance y continuar mi trabajo academico.

  Background:
    Given que el estudiante abre la pantalla "dashboard-estudiante.html"
    And el dashboard termina de cargar los datos simulados

  @AT-DE-001 @HU16
  Scenario: Visualizacion de metricas principales
    When el estudiante observa el resumen superior
    Then visualiza la cantidad de tesis activas
    And visualiza el progreso promedio
    And visualiza las alertas pendientes
    And visualiza sus dias de racha

  @AT-DE-002 @HU25
  Scenario: Visualizacion exclusiva de tesis activas
    Given que existen tesis en progreso, en revision y finalizadas
    When el sistema muestra la seccion "Mis Tesis"
    Then presenta las tesis con estado "En progreso" o "En revision"
    And no presenta las tesis marcadas como finalizadas

  @AT-DE-003 @HU17
  Scenario: Consulta del progreso y etapa actual de una tesis
    Given que el estudiante tiene una tesis activa
    When observa la tarjeta del proyecto
    Then visualiza el porcentaje y la barra de progreso
    And visualiza el texto de la etapa actual

  @AT-DE-004 @HU18
  Scenario: Consulta de alertas de coherencia
    Given que una tesis activa tiene alertas pendientes
    When el estudiante presiona el indicador de alertas
    Then el sistema despliega las observaciones criticas de la tesis
    And permite volver a ocultarlas al presionar el indicador

  @AT-DE-005 @HU19
  Scenario: Visualizacion de actividad reciente
    When el estudiante consulta la seccion "Actividad reciente"
    Then visualiza las validaciones, comentarios y alertas recientes
    And cada actividad presenta su detalle y tiempo transcurrido

  @AT-DE-006 @HU20
  Scenario: Registro de una nueva tesis mediante el asistente
    Given que el estudiante presiona "+ Nueva tesis"
    And completa los seis pasos del asistente de configuracion
    When presiona el boton "Registrar Tesis"
    Then el sistema cierra el asistente
    And redirige a "gestionar-tesis.html" con los datos iniciales del proyecto

  @AT-DE-007 @HU20 @validacion
  Scenario: Validacion del titulo requerido en una nueva tesis
    Given que el estudiante abre el asistente de configuracion
    And deja vacio el titulo de la investigacion
    When presiona el boton "Siguiente"
    Then el sistema mantiene visible el primer paso
    And no permite continuar con el registro

  @AT-DE-008 @HU21
  Scenario: Acceso a una tesis existente
    Given que el estudiante visualiza una tesis activa
    When presiona el boton "Continuar"
    Then el sistema redirige a "gestionar-tesis.html"
    And abre el flujo de edicion de la tesis seleccionada

  @AT-DE-009 @HU22
  Scenario: Visualizacion de proximos hitos
    When el estudiante consulta la seccion "Proximos hitos"
    Then visualiza la fecha, el titulo y el detalle de cada entrega

  @AT-DE-010 @HU23 @HU24
  Scenario: Consulta de recursos y racha de uso
    Given que el estudiante visualiza su racha en el resumen
    When presiona el boton "Ver recursos"
    Then el sistema muestra las plantillas y guias disponibles
    And ofrece acciones para descargar o abrir cada recurso
