import React, { useMemo, useState } from 'react';
import { TodoUpdateContext, TodosContext } from './TodosContext';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState<Status>(Status.all);

  function deleteTodo(goodId: number) {
    setTodos(current => current.filter(todo => todo.id !== goodId));
  }

  function clearCompleted() {
    setTodos(current => current.filter(todo => !todo.completed));
  }

  const updateValue = useMemo(() => ({
    deleteTodo,
    clearCompleted,
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
