import { useContext, useEffect, useRef, useState } from 'react';
import { Filter, Todo } from '../../types/todo';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DispatchContext, StateContext } from '../../context/Store';

export const Todos = () => {
  const [todosFromLocalHost, setTodosFromLocalHost] = useLocalStorage();

  const dispatch = useContext(DispatchContext);
  const { todos, filteredTodos } = useContext(StateContext);

  useEffect(() => {
    setTodosFromLocalHost(todos);
  }, [todos, filteredTodos]);

  const mainRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="todoapp__content">
      <Header mainRef={mainRef} />
      <Main mainRef={mainRef} />
      {/* Hide the footer if there are no todos */}
      {todos.length > 0 && <Footer />}
    </div>
  );
};
