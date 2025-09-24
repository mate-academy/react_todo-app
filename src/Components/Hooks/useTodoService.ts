import { useContext } from 'react';
import { TodoContext } from '../../Context/TodoContext';
import { Todos } from '../../Types/Task';
import { updateTodoToLocalStorage } from '../../TodoService/updateStorage';

export const useTodoService = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const updateTodos = (updatedTasks: Todos[]) => {
    updateTodoToLocalStorage(updatedTasks);
    setTodos(updatedTasks);
  };

  return { todos, updateTodos };
};
