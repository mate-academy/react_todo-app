import { useContext, useEffect, useRef } from 'react';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { Todo } from './types/type';
import { StateContext, DispatchContext } from './store';
const getTodosFromLocalStorage: Todo[] = JSON.parse(
  localStorage.getItem('todos') || '[]',
);

export const App = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (todos.length === 0) {
      dispatch({ type: 'setTodos', todo: getTodosFromLocalStorage });
    }
  }, []);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;

      return;
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoHeader />
        <TodoList />
        <TodoFooter />
      </div>
    </div>
  );
};
