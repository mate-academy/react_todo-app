import { useContext, useEffect, useRef } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DispatchContext, StateContext } from '../../context/Store';

export const Todos = () => {
  const [todosFromLocalHost, setTodosFromLocalHost] = useLocalStorage();

  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  useEffect(() => {
    setTodosFromLocalHost(todos);
  }, [todos]);

  useEffect(() => {
    dispatch({ type: 'addAll', payload: todosFromLocalHost });
  }, []);

  const mainRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="todoapp__content">
      <Header mainRef={mainRef} />
      <Main mainRef={mainRef} />
      {todos.length > 0 && <Footer mainRef={mainRef} />}
    </div>
  );
};
