/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import { TodoUpdateContext, TodosContext } from './TodosContext';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterTodos, setFilterTodos] = useState<Status>(Status.all);

  function deleteTodo(todoId: number) {
    setTodos(current => current.filter(todo => todo.id !== todoId));
  }

  function clearCompleted() {
    setTodos(current => current.filter(todo => !todo.completed));
  }

  function editTodo(titleId: number, editTitle: string) {
    setTodos(currentTodos => currentTodos
      .map(todo => (todo.id === titleId
        ? {
          ...todo,
          title: editTitle,
        }
        : todo)));
  }

  const updateValue = useMemo(() => ({
    deleteTodo,
    clearCompleted,
    editTodo,
  }), []);

  const value = useMemo(() => ({
    todos,
    setTodos,
    filterTodos,
    setFilterTodos,
  }), [todos, filterTodos]);

  return (
    <TodoUpdateContext.Provider value={updateValue}>
      <TodosContext.Provider value={value}>
        {children}
      </TodosContext.Provider>
    </TodoUpdateContext.Provider>
  );
};
