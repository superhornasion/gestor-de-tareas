import React, { useState } from 'react';
import { FaTrash, FaCheckCircle, FaPencilAlt, FaRegClock } from 'react-icons/fa';
import './ItemTarea.css';

// Función de utilidad para formatear la fecha
const formatDisplayDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

function ItemTarea({ task, handleUpdateTask, handleDeleteTask, onEditTask }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const isTerminada = task.estado === 'Terminada';

  const isCompletedLate = isTerminada && task.fechaLimite && task.fechaCompletada &&
    new Date(task.fechaCompletada) > new Date(task.fechaLimite);

  const getItemColorClass = () => {
    if (isCompletedLate) {
      return 'terminada-tarde';
    } else if (isTerminada) {
      return 'terminada-a-tiempo';
    } else {
      return 'pendiente';
    }
  };

  const handleCompleteClick = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const fechaActual = `${year}-${month}-${day}`;

    handleUpdateTask(task.tareaId, { estado: 'Terminada', fechaCompletada: fechaActual });
  };

  const handleReopenClick = () => {
    handleUpdateTask(task.tareaId, { estado: 'Pendiente', fechaCompletada: null });
  };

  // Manejar la eliminación con confirmación y animación
  const handleDeleteClick = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la tarea "${task.titulo}"?`)) {
      setIsDeleting(true); // Activa la animación de salida
      // Espera la duración de la animación (0.5s) antes de eliminar realmente
      setTimeout(() => {
        handleDeleteTask(task.tareaId);
        setIsDeleting(false); // Reinicia el estado después de la eliminación
      }, 500); // 500ms coincide con la duración de la animación en CSS
    }
  };

  // Añadir la clase 'fade-out' condicionalmente
  const taskClasses = `${getItemColorClass()} ${isDeleting ? 'fade-out' : ''}`;

  return (
    <div className={`task-item ${taskClasses}`}>
      <div className="task-header-controls">
        <h3 className="task-title-left">{task.titulo}</h3>

        <div className="task-header-right-group">
          {isTerminada && (
            <button className="reopen-button" onClick={handleReopenClick}>
              Reabrir
            </button>
          )}
          <div className="task-icons-group">
            {!isTerminada && (
              <span className="edit-icon" onClick={() => onEditTask(task)} title="Editar tarea">
                <FaPencilAlt />
              </span>
            )}
            <span
              className="delete-icon"
              onClick={handleDeleteClick}
              title="Eliminar tarea"
              disabled={isDeleting} // <--- Deshabilita el botón durante la animación de salida
            >
              <FaTrash />
            </span>
          </div>
        </div>
      </div>

      <p className="task-description">{task.descripcion}</p>

      <div className="task-footer-info">
        <div className="task-dates-group">
          {task.fechaCreacion && (
            <p className="task-date">
              {isTerminada ? 'Fecha terminada: ' : 'Fecha de creación: '}
              <strong>{formatDisplayDate(task.fechaCompletada || task.fechaCreacion)}</strong>
            </p>
          )}
          {task.fechaLimite && (
            <p className="task-date">
              Fecha límite: <strong>{formatDisplayDate(task.fechaLimite)}</strong>
            </p>
          )}
        </div>

        <div className="task-actions-bottom">
          {!isTerminada && (
            <button onClick={handleCompleteClick}>
              Marcar como terminada
            </button>
          )}
          {isTerminada && (
            isCompletedLate ? (
              <div className="clock-icon-container" title="Tarea terminada con retraso">
                <FaRegClock className="clock-icon" />
              </div>
            ) : (
              <div className="check-icon-container" title="Tarea terminada a tiempo">
                <FaCheckCircle className="check-icon" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemTarea;