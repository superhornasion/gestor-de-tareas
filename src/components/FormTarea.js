// src/components/FormTarea.js (ÚLTIMO CAMBIO: Título y X en la misma línea)
import React, { useState, useEffect } from 'react';
import './FormTarea.css';

function FormTarea({ handleCreateTask, handleUpdateTask, onClose, taskToEdit }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitulo(taskToEdit.titulo || '');
      setDescripcion(taskToEdit.descripcion || '');
      setFechaLimite(taskToEdit.fechaLimite ? taskToEdit.fechaLimite.split('T')[0] : '');
    } else {
      setTitulo('');
      setDescripcion('');
      setFechaLimite('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !fechaLimite) {
      alert('Por favor, completa al menos el título y la fecha límite.');
      return;
    }

    const taskData = {
      titulo,
      descripcion,
      fechaLimite,
    };

    if (taskToEdit) {
      handleUpdateTask(taskToEdit.tareaId, taskData);
    } else {
      handleCreateTask({ ...taskData, estado: 'Pendiente' });
    }
  };

  const formTitle = taskToEdit ? "Editar tarea" : "Agregar nueva tarea";
  const submitButtonText = taskToEdit ? "Guardar cambios" : "Agregar tarea";

  return (
    <div className="form-popup">
      <div className="form-content">
        {/* NUEVO CONTENEDOR PARA EL TÍTULO Y EL BOTÓN DE CIERRE */}
        <div className="form-header">
          <h2>{formTitle}</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        {/* FIN DEL NUEVO CONTENEDOR */}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="fechaLimite">Fecha límite</label>
            <input
              type="date"
              id="fechaLimite"
              value={fechaLimite}
              onChange={(e) => setFechaLimite(e.target.value)}
              required
            />
          </div>
          <button type="submit">{submitButtonText}</button>
        </form>
      </div>
    </div>
  );
}

export default FormTarea;