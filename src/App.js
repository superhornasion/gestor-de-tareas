import React, { useState, useEffect } from 'react';
import './App.css';
import FormTarea from './components/FormTarea';
import ListaTareas from './components/ListaTareas';
import { ToastContainer, toast } from 'react-toastify'; // Para las notificaciones
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'https://8wl1ir9e6f.execute-api.us-west-2.amazonaws.com/dev';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tareas`);
      const data = await response.json();
      console.log("Tareas obtenidas de la API:", data);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Error al cargar las tareas.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      await fetch(`${API_URL}/tareas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      fetchTasks();
      toast.success('¡Tarea agregada con éxito!');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Error al agregar la tarea.');
    } finally {
      setShowForm(false);
      setTaskToEdit(null);
    }
  };

  const handleUpdateTask = async (tareaId, updates) => {
    try {
      const response = await fetch(`${API_URL}/tareas/${tareaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchTasks();
      toast.info('¡Tarea actualizada con éxito!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Error al actualizar la tarea.');
    } finally {
      setShowForm(false);
      setTaskToEdit(null);
    }
  };

  const handleDeleteTask = async (tareaId) => {
    try {
      await fetch(`${API_URL}/tareas/${tareaId}`, {
        method: 'DELETE',
      });
      fetchTasks();
      toast.warn('Tarea eliminada.');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error al eliminar la tarea.');
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const handleOpenAddForm = () => {
    setTaskToEdit(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  return (
    <>
      <div className={`App-content ${showForm ? 'blur-background' : ''}`}>
        <header>
          <h1>Gestor de tareas</h1>
        </header>
        <main>
          <ListaTareas
            tasks={tasks}
            handleUpdateTask={handleUpdateTask}
            handleDeleteTask={handleDeleteTask}
            onAddTaskClick={handleOpenAddForm}
            onEditTask={handleEditTask}
          />
        </main>
      </div>

      {showForm && (
        <FormTarea
          handleCreateTask={handleCreateTask}
          handleUpdateTask={handleUpdateTask}
          onClose={handleCloseForm}
          taskToEdit={taskToEdit}
        />
      )}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> 
    </>
  );
}

export default App;