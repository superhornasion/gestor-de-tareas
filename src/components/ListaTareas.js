// src/components/ListaTareas.js (Versión con onEditTask pasado a ItemTarea)
import React, { useState } from 'react'; // Mantén useState si usas el colapsado
import ItemTarea from './ItemTarea';
import './ListaTareas.css';

function ListaTareas({ tasks, handleUpdateTask, handleDeleteTask, onAddTaskClick, onEditTask }) {
  // Mantén la lógica de colapsado si la deseas
  const [showPending, setShowPending] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

  // Tus filtros internos, ya que ListaTareas maneja ambas secciones
  const pendingTasks = tasks.filter(task => task.estado === 'Pendiente');
  const completedTasks = tasks.filter(task => task.estado === 'Terminada');

  return (
    <div className="task-sections-container">
      {/* Sección de tareas pendientes */}
      <div className="task-section">
        <div
          className="section-header"
          onClick={() => setShowPending(!showPending)}
        >
          <h2>Tareas pendientes ({pendingTasks.length})</h2>
          <span className={`toggle-icon ${showPending ? 'expanded' : ''}`}>&#9660;</span>
        </div>
        <div
          className={`task-list-content ${showPending ? 'visible' : ''}`}
        >
          <div className="task-list">
            {pendingTasks.map(task => (
              <ItemTarea
                key={task.tareaId}
                task={task}
                handleUpdateTask={handleUpdateTask}
                handleDeleteTask={handleDeleteTask}
                onEditTask={onEditTask}
              />
            ))}
          </div>
          {pendingTasks.length === 0 && (
            <p className="no-tasks-message">No hay tareas pendientes.</p>
          )}
        </div>
      </div>

      {/* Sección de tareas terminadas */}
      <div className="task-section">
        <div
          className="section-header"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          <h2>Tareas terminadas ({completedTasks.length})</h2>
          <span className={`toggle-icon ${showCompleted ? 'expanded' : ''}`}>&#9660;</span>
        </div>
        <div
          className={`task-list-content ${showCompleted ? 'visible' : ''}`}
        >
          <div className="task-list">
            {completedTasks.map(task => (
              <ItemTarea
                key={task.tareaId}
                task={task}
                handleUpdateTask={handleUpdateTask}
                handleDeleteTask={handleDeleteTask}
                onEditTask={onEditTask}
              />
            ))}
          </div>
          {completedTasks.length === 0 && (
            <p className="no-tasks-message">No hay tareas terminadas.</p>
          )}
        </div>
      </div>

      {/* Botón de Agregar tarea al final (que ya tienes) */}
      <div className="add-task-button-container">
        <button className="add-task-button" onClick={onAddTaskClick}>
          Agregar tarea
        </button>
      </div>
    </div>
  );
}

export default ListaTareas;