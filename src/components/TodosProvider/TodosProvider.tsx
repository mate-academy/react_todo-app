import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';
import { Status } from '../../types/Status';

type Props = {
  children: React.ReactNode
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredType, setFilteredType] = useState(Status.All);

  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      filteredType,
      setFilteredType,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
