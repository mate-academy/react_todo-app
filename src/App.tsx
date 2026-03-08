/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { StateContext, DispatchContext } from './components/TodoProvider';

export const App: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('all');

  // Використовуємо окремі контексти для стану та діспатчу
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredTodos = React.useMemo(() => {
    switch (sortBy) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, sortBy]);

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const deleteTodo = (todo: Todo) => {
    dispatch({ type: 'DELETE', payload: todo.id });
    inputRef.current?.focus();
  };

  const changeCompletedStatus = (todo: Todo) => {
    dispatch({ type: 'CHANGE', payload: todo.id });
  };

  const completedTodos = todos.filter(t => t.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          dispatch={dispatch}
          completedTodo={completedTodos}
          query={query}
          setQuery={setQuery}
          inputRef={inputRef}
          changeInputValue={changeInputValue}
        />

        <TodoList
          filteredTodos={filteredTodos}
          changeCompletedStatus={changeCompletedStatus}
          deleteTodo={deleteTodo}
          dispatch={dispatch}
        />

        <Footer
          todos={todos}
          sortBy={sortBy}
          setSortBy={setSortBy}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
};
