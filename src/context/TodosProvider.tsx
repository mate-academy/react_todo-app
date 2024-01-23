import React, { useMemo, useState } from 'react';
import { TodosContext } from './TodosContext';

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState(+new Date());
  const [title, setTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  // const [field, setField] = useState('');

  const value = useMemo(() => ({
    todos,
    setTodos,
    id,
    setId,
    title,
    setTitle,
    isCompleted,
    setIsCompleted,
  }), [todos, id, title, isCompleted]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
