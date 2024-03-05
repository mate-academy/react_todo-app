import React, { useCallback } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TodosFilter from './components/TodosFilter';
import { useDispatchContext, useTodoContext } from './context/GlobalContext';

export const App: React.FC = () => {
  const { todos } = useTodoContext();
  const { dispatch } = useDispatchContext();
  const allActive = todos.filter(todo => !todo.completed).length > 0;

  const toggleAll = useCallback(() => {
    todos.forEach(todo => {
      dispatch({
        type: 'toggle',
        payload: { id: todo.id, completed: allActive },
      });
    });
  }, [allActive, dispatch, todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <AddTodoForm />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={toggleAll}
          checked={!allActive}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />
      </section>

      {!!todos.length && <TodosFilter data-cy="todosFilter" />}
    </div>
  );
};
