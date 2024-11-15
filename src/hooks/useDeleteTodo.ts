import { useContext, useState } from 'react';

import { TodosContext } from '../context/TodoContext';

export const useDeleteTodo = () => {
  const [isDeleting, setDeleting] = useState(false);
  const { deleteCompletedTodos, onFocus, deleteTodo } =
    useContext(TodosContext);

  const handleDeleteTodo = (id: string) => {
    setDeleting(true);

    deleteTodo(id);

    setDeleting(false);
    onFocus();
  };

  const handleDeleteCompletedTodos = () => {
    deleteCompletedTodos();

    onFocus();
  };

  return { handleDeleteTodo, isDeleting, handleDeleteCompletedTodos };
};
