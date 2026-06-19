@dashboard @asesor @EP07
Feature: Dashboard principal del asesor en ThesiSmart
  Como asesor con una sesion iniciada
  quiero consultar estudiantes, revisiones y reuniones
  para organizar el seguimiento de las tesis asignadas.

  Background:
    Given que el asesor abre la pantalla "dashboard-asesor.html"
    And el dashboard termina de cargar los datos simulados

  @AT-DA-001 @HU46
  Scenario: Visualizacion de estudiantes asignados
    When el asesor consulta la lista de estudiantes
    Then visualiza el nombre y el tema de tesis de cada estudiante
    And visualiza su estado y porcentaje de progreso
    And dispone de la accion "Revisar tesis"

  @AT-DA-002 @HU46
  Scenario: Busqueda de estudiante por nombre
    Given que existen varios estudiantes asignados
    When el asesor escribe un nombre en el campo "Buscar estudiante"
    Then el sistema muestra solamente las coincidencias encontradas

  @AT-DA-003 @HU46 @validacion
  Scenario: Busqueda sin coincidencias
    When el asesor busca un nombre que no pertenece a ningun estudiante
    Then el sistema muestra el mensaje "No se encontraron estudiantes con ese nombre"

  @AT-DA-004 @HU47
  Scenario: Visualizacion de revisiones pendientes
    When el asesor consulta la seccion "Revisiones pendientes"
    Then visualiza las tesis que requieren revision
    And cada elemento presenta estudiante, tarea pendiente y antiguedad
    And dispone de la accion "Revisar"

  @AT-DA-005 @HU46 @HU47
  Scenario: Visualizacion de indicadores del dashboard
    When el asesor observa las tarjetas de resumen
    Then visualiza la cantidad de estudiantes activos
    And visualiza la cantidad de revisiones pendientes
    And visualiza la cantidad de tesis aprobadas

  @AT-DA-006 @HU50
  Scenario: Visualizacion de reuniones programadas
    When el asesor consulta la seccion "Proximas reuniones"
    Then visualiza el estudiante, la fecha y el horario de cada reunion
    And visualiza el tema que se tratara en la asesoria
