import { useContext } from 'react';
import { TodoContext } from '../../Context/TodoContext';
import { Todos } from '../../Types/Task';
import { updateTodoToLocalStorage } from '../../TodoService/updateStorage';

export const useTodoService = () => {
  const { tasks, setTask } = useContext(TodoContext);

  const updateTodo = (updatedTasks: Todos[]) => {
    updateTodoToLocalStorage(updatedTasks);
    setTask(updatedTasks);
  };

  return { tasks, updateTasks: updateTodo };
};
