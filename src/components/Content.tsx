import React, { useContext, useEffect, useState } from 'react';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { TodosContext } from '../context/TodosContex';

export const Content: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const [focused, setFocused] = useState(true);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const savedTodos = localStorage.getItem('todos');

  useEffect(() => {
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    setVisibleTodos(todos);
  }, [todos]);

  return (
    <div className="todoapp__content">
      <Header focused={focused} setFocused={setFocused} />

      <TodoList visibleTodos={visibleTodos} setFocused={setFocused} />

      {/* Hide the footer if there are no todos */}
      {todos.length > 0 && (
        <Footer
          visibleTodos={visibleTodos}
          setVisibleTodos={setVisibleTodos}
          setFocused={setFocused}
        />
      )}
    </div>
  );
};
