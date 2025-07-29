import React, { useState, useEffect } from 'react';
import './FormTarea.css';

function FormTarea({ handleCreateTask, handleUpdateTask, onClose, taskToEdit }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');

  // Estados para guardar los valores iniciales y detectar cambios
  const [initialTitulo, setInitialTitulo] = useState('');
  const [initialDescripcion, setInitialDescripcion] = useState('');
  const [initialFechaLimite, setInitialFechaLimite] = useState('');


  useEffect(() => {
    // Al cargar el componente o cambiar taskToEdit, inicializa los estados del formulario
    // y guarda los valores iniciales para detectar cambios
    const currentTitulo = taskToEdit ? (taskToEdit.titulo || '') : '';
    const currentDescripcion = taskToEdit ? (taskToEdit.descripcion || '') : '';
    const currentFechaLimite = taskToEdit ? (taskToEdit.fechaLimite ? taskToEdit.fechaLimite.split('T')[0] : '') : '';

    setTitulo(currentTitulo);
    setDescripcion(currentDescripcion);
    setFechaLimite(currentFechaLimite);

    setInitialTitulo(currentTitulo);
    setInitialDescripcion(currentDescripcion);
    setInitialFechaLimite(currentFechaLimite);

  }, [taskToEdit]);

  // Manejo de la confirmación al cerrar el formulario
  const handleCloseFormWithConfirmation = () => {
    const hasChanged =
      titulo !== initialTitulo ||
      descripcion !== initialDescripcion ||
      fechaLimite !== initialFechaLimite;

    if (hasChanged) {
      if (window.confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
        onClose(); // Llama a la función de cierre del padre si el usuario confirma
      }
    } else {
      onClose(); // Cierra directamente si no hay cambios
    }
  };

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
        <div className="form-header">
          <h2>{formTitle}</h2>
          <button className="close-button" onClick={handleCloseFormWithConfirmation}>X</button>
        </div>

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